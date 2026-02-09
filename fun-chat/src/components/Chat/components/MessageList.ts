import { ElementBuilder } from '@utils';
import type { Message, MessageStatus } from '@types';
import { authState } from '@state';
import { MessageItem } from '@components/Chat/components';

export default class MessageList extends ElementBuilder {
  private unreadSeparator: ElementBuilder | null = null;
  private separatorRemoved: boolean = false;

  private messageItems: Map<string, MessageItem> = new Map();

  constructor() {
    super({
      classes: ['messages-history', 'empty'],
      content: 'Select a user to start chatting',
      events: [{ type: 'click', handler: () => this.removeUnreadSeparator() }],
    });
  }

  public render(messages: Message[], hasUnread = false): void {
    this.clear();
    this.removeClass('empty');
    this.separatorRemoved = false;

    if (messages.length === 0) {
      this.addClass('empty');
      this.content = 'There is nothing here. Write the first message...';
    }

    const sorted = messages.sort((a, b) => a.datetime - b.datetime);
    let separatorInserted = false;

    sorted.forEach((message) => {
      if (
        hasUnread &&
        !this.separatorRemoved &&
        !separatorInserted &&
        !message.status.isReaded &&
        message.from !== authState.user.login
      ) {
        this.unreadSeparator = new ElementBuilder({ classes: ['unread-separator'], content: 'New messages' });
        this.addChild(this.unreadSeparator);
        separatorInserted = true;
      }
      this.addChild(new MessageItem(message));
    });

    this.updateScroll();
  }

  public addMessage(message: Message): void {
    if (this.hasClass('empty')) {
      this.removeClass('empty');
      this.content = '';
    }

    const messageItem = new MessageItem(message);
    this.messageItems.set(message.id, messageItem);
    this.addChild(messageItem);

    if (message.from === authState.user.login) this.removeUnreadSeparator();
    this.addChild(new MessageItem(message));
    this.updateScroll();
  }

  public updateScroll(): void {
    if (this.unreadSeparator && this.separatorRemoved === false) {
      this.unreadSeparator.getElement().scrollIntoView({ block: 'start' });
    } else {
      const element = this.getElement();
      element.scrollTop = element.scrollHeight;
    }
  }

  private removeUnreadSeparator(): void {
    if (this.unreadSeparator === null) return;

    this.unreadSeparator.remove();
    this.unreadSeparator = null;
    this.separatorRemoved = true;
  }

  public removeMessage(messageId: string): void {
    const messageElement = this.getElement().querySelector(`[data-message-id="${messageId}"]`);
    if (messageElement) messageElement.remove();
  }

  public updateMessage(updatedMessage: Message): void {
    const messageElement = this.getElement().querySelector(`[data-message-id="${updatedMessage.id}"]`);
    if (messageElement) {
      const textElement = messageElement.querySelector('.message-text');
      if (textElement) {
        textElement.textContent = updatedMessage.text;

        const editedBadge = messageElement.querySelector('.edited-badge');
        if (updatedMessage.status.isEdited && editedBadge === null) {
          const badge = new ElementBuilder({
            tag: 'span',
            classes: ['edited-badge'],
            content: '(edited)',
          });
          messageElement.appendChild(badge.getElement());
        }
      }
    }
  }

  public updateMessageStatus(messageId: string, status: MessageStatus): void {
    const messageItem = this.messageItems.get(messageId);
    if (messageItem && status) messageItem.updateStatus(status);
  }
}
