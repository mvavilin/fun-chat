import type { User, Message } from '@types';
import { NOTIFICATION, SERVER_ERRORS, SERVER_EVENTS, PAYLOAD_FIELDS } from '@constants';
import { wsClient } from '@/wsClient';
import { ElementBuilder, eventEmitter } from '@utils';
import { MessageList, MessageInput } from '@components/Chat/components';
import { Notification } from '@components/ui';

export default class Chat extends ElementBuilder {
  private selectedUser: User | null = null;
  private messageList: MessageList = new MessageList();
  private messageInput: MessageInput = new MessageInput();
  private unreadCount: number = 0;

  constructor() {
    super({ classes: ['chat'] });

    this.setupEventListeners();
    this.render();
  }

  private render(): void {
    this.addChild(this.messageList, this.messageInput);
  }

  private setupEventListeners(): void {
    eventEmitter.subscribe('user-selected', (user: User): Promise<void> => this.onUserSelected(user));
    eventEmitter.subscribe('send-message', (text: string): Promise<void> => this.sendMessage(text));

    wsClient.subscribe(SERVER_EVENTS.MSG_SEND, (response) => {
      if (PAYLOAD_FIELDS.MESSAGE in response.payload && PAYLOAD_FIELDS.TEXT in response.payload.message)
        this.onNewMessage(response.payload.message);
    });
  }

  private onNewMessage(message: Message): void {
    if (this.selectedUser && (message.from === this.selectedUser.login || message.to === this.selectedUser.login)) {
      this.messageList.addMessage(message);
    }
  }

  private async onUserSelected(user: User): Promise<void> {
    this.selectedUser = user;
    this.messageInput.setActive(true);

    try {
      this.unreadCount = await wsClient.getUnreadCount(user.login);

      await this.loadMessageHistory();

      if (this.unreadCount > 0) await this.markAsRead();
    } catch (error) {
      const message = error instanceof Error ? error.message : SERVER_ERRORS.INTERNAL_ERROR;
      new Notification(message, NOTIFICATION.TYPE.ERROR);
      this.messageList.clear();
    }
  }

  private async loadMessageHistory(): Promise<void> {
    if (this.selectedUser === null) return;

    try {
      const messages = await wsClient.getMessageHistory(this.selectedUser.login);
      const hasUnread = this.unreadCount > 0;

      this.messageList.render(messages, hasUnread);
      this.messageList.updateScroll();
    } catch (error) {
      const message = error instanceof Error ? error.message : SERVER_ERRORS.INTERNAL_ERROR;
      new Notification(message, NOTIFICATION.TYPE.ERROR);
      this.messageList.clear();
    }
  }

  private async sendMessage(text: string): Promise<void> {
    if (this.selectedUser === null || text === '') return;

    try {
      await wsClient.sendMessage(this.selectedUser.login, text);
    } catch (error) {
      const message = error instanceof Error ? error.message : SERVER_ERRORS.INTERNAL_ERROR;
      new Notification(message, NOTIFICATION.TYPE.ERROR);
    }
  }

  private async markAsRead(): Promise<void> {
    if (this.selectedUser === null) return;

    try {
      const messages = await wsClient.getMessageHistory(this.selectedUser.login);

      for (const message of messages) {
        if (message.status.isReaded === false && message.from === this.selectedUser.login) {
          try {
            await wsClient.markAsRead(message.id);
          } catch (error) {
            const message = error instanceof Error ? error.message : SERVER_ERRORS.INTERNAL_ERROR;
            new Notification(message, NOTIFICATION.TYPE.ERROR);
          }
        }
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : SERVER_ERRORS.INTERNAL_ERROR;
      new Notification(message, NOTIFICATION.TYPE.ERROR);
    }
  }
}
