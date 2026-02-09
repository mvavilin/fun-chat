import type {
  ServerRequest,
  ServerEventType,
  ServerEventHandler,
  ServerResponse,
  ServerRequestPayloads,
  User,
  Message,
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

      if (this.reconnectAttempts === 0) new Notification(WS_MESSAGES.CONNECTION_CLOSED, NOTIFICATION.TYPE.WARNING);

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

    console.log('Server status:', this.ws.readyState === WebSocket.OPEN);

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

  public request<T extends ServerEventType>(type: T, payload: ServerRequestPayloads = null): Promise<ServerResponse> {
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
          const errorMessage = PAYLOAD_FIELDS.ERROR in response.payload ? response.payload.error : 'Unknown error';
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

      console.log('Request:', request);

      this.send(request);
    });

    this.pendingRequests.set(key, promise);
    return promise;
  }

  // TODO: move methods to a private ws (e.g., WSFunChat)

  public async getActiveUsers(): Promise<User[]> {
    const response = await this.request(SERVER_EVENTS.USER_ACTIVE);

    return PAYLOAD_FIELDS.USERS in response.payload ? response.payload.users : [];
  }

  public async getInactiveUsers(): Promise<User[]> {
    const response = await this.request(SERVER_EVENTS.USER_INACTIVE);

    return PAYLOAD_FIELDS.USERS in response.payload ? response.payload.users : [];
  }

  public async getUnreadCount(userLogin: string): Promise<number> {
    const response = await this.request(SERVER_EVENTS.MSG_COUNT_NOT_READED_FROM_USER, {
      user: { login: userLogin },
    });

    return PAYLOAD_FIELDS.COUNT in response.payload ? response.payload.count : 0;
  }

  public async getMessageHistory(userLogin: string): Promise<Message[]> {
    const response = await this.request(SERVER_EVENTS.MSG_FROM_USER, {
      user: { login: userLogin },
    });

    return PAYLOAD_FIELDS.MESSAGES in response.payload ? response.payload.messages : [];
  }

  public async sendMessage(to: string, text: string): Promise<Message | null> {
    const response = await this.request(SERVER_EVENTS.MSG_SEND, {
      message: { to, text },
    });
    return PAYLOAD_FIELDS.MESSAGE in response.payload && PAYLOAD_FIELDS.TEXT in response.payload.message
      ? response.payload.message
      : null;
  }

  public async markAsRead(id: string): Promise<void> {
    await this.request(SERVER_EVENTS.MSG_READ, { message: { id } });
  }

  public async editMessage(id: string, newText: string): Promise<void> {
    await this.request(SERVER_EVENTS.MSG_EDIT, {
      message: { id, text: newText },
    });
  }

  public async deleteMessage(id: string): Promise<void> {
    await this.request(SERVER_EVENTS.MSG_DELETE, {
      message: { id },
    });
  }
}
