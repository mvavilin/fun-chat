import { ElementBuilder } from '@utils';
import type { User } from '@types';

export default class ChatHeader extends ElementBuilder {
  private recipientName: ElementBuilder;
  private statusIndicator: ElementBuilder;

  constructor() {
    super({ classes: ['chat-header'] });

    this.recipientName = new ElementBuilder({
      tag: 'h3',
      content: 'Select a user to chat',
      classes: ['recipient-name'],
    });

    this.statusIndicator = new ElementBuilder({
      tag: 'span',
      classes: ['status-indicator'],
      content: '',
    });

    this.render();
  }

  public updateUser(user: User): void {
    this.recipientName.content = user.login;

    this.statusIndicator.content = user.isLogined ? 'online' : 'offline';
  }

  private render(): void {
    const recipientInfo = new ElementBuilder({ classes: ['recipient-info'] });
    recipientInfo.addChild(this.recipientName, this.statusIndicator);
    this.addChild(recipientInfo);
  }
}
