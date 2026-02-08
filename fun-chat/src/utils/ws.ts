import type {
  ServerRequest,
  ServerEventType,
  ServerEventHandler,
  ServerResponse,
  ServerRequestPayloads,
} from '@types';
import { WS_CONFIG, PAYLOAD_FIELDS, SERVER_EVENTS, WS_MESSAGES, NOTIFICATION } from '@constants';
import { Notification } from '@components/ui';
import { generateId } from '@utils';
import { authState } from '@state';

export class WSClient {
  private url: string;
  private ws: WebSocket | null = null;
  private listeners: Map<ServerEventType, ServerEventHandler[]> = new Map();
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = WS_CONFIG.MAX_RECONNECT_ATTEMPTS;
  private reconnectDelay: number = WS_CONFIG.RECONNECT_DELAY_MS;
  private isConnecting: boolean = false;
  private pendingRequests: Map<string, Promise<ServerResponse>> = new Map();

  constructor(url: string) {
    this.url = url;
  }

  private reconnect(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts += 1;
      setTimeout(() => this.connect(), this.reconnectDelay);
    }
  }

  public async connect(): Promise<void> {
    if (this.isConnecting) return;
    this.isConnecting = true;

    this.ws = new WebSocket(this.url);

    this.ws.onopen = async () => {
      this.reconnectAttempts = 0;
      this.isConnecting = false;

      new Notification(WS_MESSAGES.CONNECTED);

      await this.reAuth();
    };

    this.ws.onmessage = (event) => {
      try {
        const response: ServerResponse = JSON.parse(event.data);
        this.notifySubscribers(response);
      } catch {
        new Notification(WS_MESSAGES.INVALID_MESSAGE, NOTIFICATION.TYPE.ERROR);
      }
    };

    this.ws.onerror = () => {
      this.isConnecting = false;
    };

    this.ws.onclose = () => {
      this.isConnecting = false;

      if (this.reconnectAttempts === 0)
        new Notification(WS_MESSAGES.CONNECTION_CLOSED, NOTIFICATION.TYPE.WARNING);

      setTimeout(() => this.reconnect(), this.reconnectDelay);
    };
  }

  public async reAuth(): Promise<void> {
    if (authState.isAuth === false) return;

    try {
      await this.request(SERVER_EVENTS.USER_LOGIN, { user: authState.user });
      new Notification(WS_MESSAGES.REAUTH_SUCCESS, NOTIFICATION.TYPE.SUCCESS);
    } catch {
      authState.clearUser();
    }
  }

  public send<T>(response: T): void {
    if (this.ws === null) return;

    if (this.ws.readyState === WebSocket.OPEN) this.ws.send(JSON.stringify(response));
  }

  public subscribe(event: ServerEventType, handler: ServerEventHandler): void {
    if (this.listeners.has(event) === false) this.listeners.set(event, []);

    const listeners = this.listeners.get(event);
    if (listeners) listeners.push(handler);
  }

  public unsubscribe(event: ServerEventType, handler: ServerEventHandler): void {
    const listeners = this.listeners.get(event);
    if (listeners) {
      const index = listeners.indexOf(handler);
      if (index > -1) listeners.splice(index, 1);
    }
  }

  public close(): void {
    if (this.ws) this.ws.close();

    this.listeners.clear();
  }

  private notifySubscribers(response: ServerResponse): void {
    const notify = (listeners: ServerEventHandler[] | undefined) => {
      if (listeners) listeners.forEach((listener) => listener(response));
    };

    notify(this.listeners.get(response.type));
    notify(this.listeners.get('*'));
  }

  public request<T extends ServerEventType>(
    type: T,
    payload: ServerRequestPayloads
  ): Promise<ServerResponse> {
    const key = JSON.stringify({ type, payload });

    const existing = this.pendingRequests.get(key);
    if (existing) return existing;

    const request: ServerRequest<ServerRequestPayloads> = {
      id: generateId(),
      type,
      payload,
    };

    const promise = new Promise<ServerResponse>((resolve, reject) => {
      const handler = (response: ServerResponse) => {
        const cleanup = () => {
          this.unsubscribe(type, handler);
          this.unsubscribe(SERVER_EVENTS.ERROR, handler);
          this.pendingRequests.delete(key);
        };

        if (response.type === SERVER_EVENTS.ERROR) {
          cleanup();
          const errorMessage =
            PAYLOAD_FIELDS.ERROR in response.payload ? response.payload.error : 'Unknown error';
          reject(new Error(errorMessage));
          return;
        }

        if (response.id === request.id && response.type === type) {
          cleanup();
          resolve(response);
        }
      };

      this.subscribe(type, handler);
      this.subscribe(SERVER_EVENTS.ERROR, handler);
      this.send(request);
    });

    this.pendingRequests.set(key, promise);
    return promise;
  }
}
