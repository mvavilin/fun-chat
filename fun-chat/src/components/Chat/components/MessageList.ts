import { ElementBuilder } from '@utils';
import type { Message } from '@types';
import { MessageItem } from '@components/Chat/components';

export default class MessageList extends ElementBuilder {
  constructor() {
    super({
      classes: ['messages-history', 'empty'],
      content: 'Select a user to start chatting',
    });
  }

  public render(messages: Message[]): void {
    this.clear();
    this.removeClass('empty');

    const sortedMessages = messages.sort((a, b) => a.datetime - b.datetime);

    sortedMessages.forEach((message) => this.addChild(new MessageItem(message)));
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    this.getElement().scrollTop = this.getElement().scrollHeight;
  }

  public addMessage(message: Message): void {
    const messageItem = new MessageItem(message);
    this.addChild(messageItem);
    this.scrollToBottom();
  }
}
