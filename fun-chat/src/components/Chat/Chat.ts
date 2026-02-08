import { ElementBuilder } from '@utils';

export default class Chat extends ElementBuilder {
  private chatHeader = new ElementBuilder({ classes: ['chat-header'] });
  private recipientInfo = new ElementBuilder({ classes: ['recipient-info'] });
  private recipientName = new ElementBuilder({
    tag: 'h3',
    content: 'Select a user to chat',
    classes: ['recipient-name'],
  });
  private statusIndicator = new ElementBuilder({
    tag: 'span',
    classes: ['status-indicator', 'offline'],
    content: 'offline',
  });
  private chatActions = new ElementBuilder({ classes: ['chat-actions'] });
  private typingIndicator = new ElementBuilder({
    classes: ['typing-indicator'],
    content: 'typing...',
  });
  private messagesHistory = new ElementBuilder({
    classes: ['messages-history', 'empty'],
    content: 'Select a user to start chatting',
  });
  private messageInputArea = new ElementBuilder({ classes: ['message-input-area'] });
  private messageInputWrapper = new ElementBuilder({ classes: ['message-input-wrapper'] });
  private messageInput = new ElementBuilder({
    tag: 'textarea',
    classes: ['input', 'textarea', 'message-input'],
    attributes: { placeholder: 'Type your message here...', rows: '3', disabled: 'true' },
  });
  private sendButton = new ElementBuilder({
    tag: 'button',
    classes: ['btn', 'send-button'],
    attributes: { disabled: 'true', type: 'button' },
    content: 'Send',
  });

  constructor() {
    super({ classes: ['chat'] });

    this.render();
  }

  private render(): void {
    this.typingIndicator.addStyle({ display: 'none' });

    this.recipientInfo.addChild(this.recipientName, this.statusIndicator);
    this.chatActions.addChild(this.typingIndicator);
    this.chatHeader.addChild(this.recipientInfo, this.chatActions);
    this.messageInputWrapper.addChild(this.messageInput);
    this.messageInputArea.addChild(this.messageInputWrapper, this.sendButton);

    this.addChild(this.chatHeader, this.messagesHistory, this.messageInputArea);
  }
}
