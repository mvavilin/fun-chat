import { ElementBuilder } from '@utils';
import type { Message } from '@types';
import { authState } from '@state';
import { MessageItem } from '@components/Chat/components';

export default class MessageList extends ElementBuilder {
  private unreadSeparator: ElementBuilder | null = null;
  private separatorRemoved: boolean = false;

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
}
