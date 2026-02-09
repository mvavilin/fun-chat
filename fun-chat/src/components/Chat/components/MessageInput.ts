import { ElementBuilder, eventEmitter } from '@utils';
import { SubmitBtn } from '@/components/ui';

export default class MessageInput extends ElementBuilder {
  private isActive: boolean = false;

  private textarea: ElementBuilder = new ElementBuilder({
    tag: 'textarea',
    id: 'textarea',
    classes: ['input', 'textarea', 'message-input'],
    attributes: {
      placeholder: 'Type your message here...',
      rows: '2',
      disabled: 'true',
    },
  });
  private sendButton: SubmitBtn = new SubmitBtn({
    content: 'Send',
    events: [{ type: 'click', handler: () => this.sendMessage() }],
    disabled: true,
  });

  constructor() {
    super({ tag: 'form', classes: ['message-input-area'] });

    this.textarea.getElement().addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Enter' && !event.shiftKey && this.isActive) {
        event.preventDefault();
        this.sendMessage();
      }
    });

    this.render();
  }

  public setActive(active: boolean): void {
    this.isActive = active;
    const textareaElement = this.textarea.getElement();
    if (textareaElement instanceof HTMLTextAreaElement) textareaElement.disabled = !active;
    this.sendButton.disabled = !active;

    if (active) this.textarea.getElement().focus();
  }

  public getMessage(): string | null {
    const textareaElement = this.textarea.getElement();
    return textareaElement instanceof HTMLTextAreaElement ? textareaElement.value.trim() : null;
  }

  public clearMessageInput(): void {
    const textareaElement = this.textarea.getElement();
    if (textareaElement instanceof HTMLTextAreaElement) textareaElement.value = '';
  }

  private sendMessage(): void {
    const text = this.getMessage();
    if (text && this.isActive) {
      eventEmitter.emit('send-message', text);
      this.clearMessageInput();
    }
  }

  private render(): void {
    const wrapper = new ElementBuilder({ classes: ['message-input-wrapper'] });
    wrapper.addChild(this.textarea);
    this.addChild(wrapper, this.sendButton);
  }
}
