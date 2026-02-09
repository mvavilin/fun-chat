import type { User, Message } from '@types';

type EventsMap = {
  'user-selected': User;
  'send-message': string;
  'edit-message': Message;
  'delete-message': Message;
};

export class EventEmitter<Events extends Record<string, unknown>> {
  private eventMap: {
    [K in keyof Events]?: Set<(eventData: Events[K]) => void>;
  } = {};

  subscribe<EventKey extends keyof Events>(
    eventName: EventKey,
    eventCallback: (eventData: Events[EventKey]) => void
  ): void {
    if (this.eventMap[eventName] === undefined) this.eventMap[eventName] = new Set();
    this.eventMap[eventName].add(eventCallback);
  }

  unsubscribe<EventKey extends keyof Events>(
    eventName: EventKey,
    eventCallback: (eventData: Events[EventKey]) => void
  ): void {
    this.eventMap[eventName]?.delete(eventCallback);
  }

  emit<EventKey extends keyof Events>(eventName: EventKey, eventData: Events[EventKey]): void {
    this.eventMap[eventName]?.forEach((eventCallback) => eventCallback(eventData));
  }
}

export const eventEmitter = new EventEmitter<EventsMap>();
