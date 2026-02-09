import { ElementBuilder, ButtonBuilder } from '@utils';
import type { Message, MessageStatus } from '@types';
import { authState } from '@state';
import { wsClient } from '@/wsClient';

export default class MessageItem extends ElementBuilder {
  private message: Message;
  private isEditing: boolean = false;

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

  private actions = new ElementBuilder({ classes: ['message-actions'] });
  private editButton: ButtonBuilder = new ButtonBuilder({
    classes: ['small', 'edit-btn'],
    attributes: { title: 'Edit' },
    content: '✏️',
  });
  private deleteButton: ButtonBuilder = new ButtonBuilder({
    classes: ['small', 'delete-btn'],
    attributes: { title: 'Delete' },
    content: '🗑️',
  });

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

      this.updateStatusDisplay();
    }

    this.contentWrapper.addChild(this.text, this.meta);

    this.addChild(this.contentWrapper);

    if (this.message.from === authState.user.login) this.addActionButtons();
  }

  private addActionButtons(): void {
    this.editButton.addEvent({
      type: 'click',
      handler: () => {
        if (this.isEditing) this.saveChanges();
        else this.enableEditing();
      },
    });
    this.deleteButton.addEvent({
      type: 'click',
      handler: () => {
        this.deleteMessage();
      },
    });

    this.actions.addChild(this.editButton, this.deleteButton);
    this.addChild(this.actions);
  }

  private deleteMessage(): void {
    wsClient.deleteMessage(this.message.id);
  }

  private enableEditing(): void {
    this.isEditing = true;
    this.editButton.content = '💾';
    this.text.getElement().setAttribute('contenteditable', 'true');
    this.text.getElement().focus();
  }

  private saveChanges(): void {
    const newText = this.text.getElement().textContent.trim();
    if (newText === '' || newText === this.message.text) {
      this.cancelEdit();
      return;
    }

    this.message.text = newText;
    this.message.status.isEdited = true;

    wsClient.editMessage(this.message.id, newText);
  }

  private cancelEdit(): void {
    this.isEditing = false;
    this.editButton.content = '✏️';
    this.text.getElement().removeAttribute('contenteditable');
    this.text.content = this.message.text;
    this.updateDisplay();
  }

  private updateDisplay(): void {
    this.text.content = this.message.text;
    if (this.message.status.isEdited) {
      this.contentWrapper.addChild(this.editedBadge);
    }
    this.text.getElement().removeAttribute('contenteditable');
  }

  public updateStatus(newStatus: MessageStatus): void {
    if (newStatus.isDelivered !== undefined) this.message.status.isDelivered = newStatus.isDelivered;
    if (newStatus.isReaded !== undefined) this.message.status.isReaded = newStatus.isReaded;

    this.updateStatusDisplay();
  }

  private updateStatusDisplay(): void {
    if (this.message.status === null) return;

    if (this.message.status.isReaded) {
      this.status.content = 'read';
    } else if (this.message.status.isDelivered) {
      this.status.content = 'delivered';
    } else {
      this.status.content = 'sent';
    }
  }
}
