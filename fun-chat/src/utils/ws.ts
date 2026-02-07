import type { ServerEventType, ServerResponse, ServerEventHandler } from '@types';
import { WS_CONFIG } from '@constants';

export class WSClient {
  private url: string;

  private ws: WebSocket | null = null;
  private listeners: Map<ServerEventType, ServerEventHandler[]> = new Map<
    ServerEventType,
    ServerEventHandler[]
  >();
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = WS_CONFIG.MAX_RECONNECT_ATTEMPTS;
  private reconnectDelay: number = WS_CONFIG.RECONNECT_DELAY_MS;
  private isConnecting: boolean = false;

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
    if (this.isConnecting) {
      // TODO: remove after testing
      console.log('[WS] Already connecting...');
      return;
    }
    // TODO: remove after testing
    console.log('[WS] Connecting to', this.url);
    this.isConnecting = true;

    this.ws = new WebSocket(this.url);

    this.ws.onopen = () => {
      this.reconnectAttempts = 0;
      this.isConnecting = false;
      // TODO: remove after testing
      console.log('[WS] Connected');
    };

    this.ws.onmessage = (event) => {
      try {
        const data: ServerResponse = JSON.parse(event.data);
        // TODO: remove after testing
        console.log('[WS] Message received:', data.type, data);
        this.notifySubscribers(data);
      } catch {
        // console.error(WS_ERRORS.INVALID_MESSAGE, event.data);
        // TODO: remove after testing
        console.error('[WS] Invalid message received:', event.data);
      }
    };

    this.ws.onerror = (error) => {
      this.isConnecting = false;
      // console.error(WS_ERRORS.CONNECTION_FAILED(this.url, error.type));
      // TODO: remove after testing
      console.error('[WS] Connection error:', error);
    };

    this.ws.onclose = (event) => {
      this.isConnecting = false;
      // TODO: remove after testing
      console.warn(
        `[WS] Connection closed (code: ${event.code}, reason: ${event.reason}). Attempting to reconnect...`
      );
      setTimeout(() => this.reconnect(), this.reconnectDelay);
    };
  }

  send<T>(data: T): void {
    if (this.ws === null) return;

    if (this.ws.readyState === WebSocket.OPEN) this.ws.send(JSON.stringify(data));
  }

  subscribe(event: ServerEventType, handler: ServerEventHandler): void {
    if (this.listeners.has(event) === false) this.listeners.set(event, []);

    const listeners = this.listeners.get(event);
    if (listeners) listeners.push(handler);
  }

  unsubscribe(event: ServerEventType, handler: ServerEventHandler): void {
    const listeners = this.listeners.get(event);
    if (listeners) {
      const index = listeners.indexOf(handler);
      if (index > -1) listeners.splice(index, 1);
    }
  }

  close(): void {
    if (this.ws) this.ws.close();

    this.listeners.clear();
  }

  private notifySubscribers(data: ServerResponse): void {
    const notify = (listeners: ServerEventHandler[] | undefined) => {
      if (listeners) listeners.forEach((listener) => listener(data));
    };

    notify(this.listeners.get(data.type));
    notify(this.listeners.get('*'));
  }
}
