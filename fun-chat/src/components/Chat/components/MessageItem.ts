import { ElementBuilder } from '@utils';
import type { Message } from '@types';
import { authState } from '@state';

export default class MessageItem extends ElementBuilder {
  private message: Message;

  private text: ElementBuilder = new ElementBuilder({ classes: ['message-text'] });
  private editedBadge: ElementBuilder = new ElementBuilder({
    tag: 'span',
    classes: ['edited-badge'],
    content: ' (edited)',
  });
  private time: ElementBuilder = new ElementBuilder({ tag: 'span', classes: ['message-time'] });
  private meta: ElementBuilder = new ElementBuilder({ classes: ['message-meta'] });
  private status: ElementBuilder = new ElementBuilder({
    tag: 'span',
    classes: ['message-status'],
  });
  private contentWrapper: ElementBuilder = new ElementBuilder({ classes: ['message-content'] });

  constructor(message: Message) {
    super({
      classes: ['message', message.from === authState.user.login ? 'sent' : 'received'],
      attributes: { 'data-message-id': message.id },
    });

    this.message = message;
    this.render();
  }

  private render(): void {
    this.text.content = this.message.text;

    if (this.message.status.isEdited) this.text.addChild(this.editedBadge);

    this.time.content = new Date(this.message.datetime).toLocaleTimeString();
    this.meta.addChild(this.time);

    if (this.message.from === authState.user.login) {
      this.meta.addChild(this.status);
    }

    this.contentWrapper.addChild(this.text, this.meta);

    this.addChild(this.contentWrapper);
  }
}
