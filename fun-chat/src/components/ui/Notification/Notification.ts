import { ElementBuilder, ButtonBuilder } from '@utils';
import type { NotificationType } from '@types';
import { NOTIFICATION } from '@constants';

export default class Notification {
  private container: ElementBuilder = new ElementBuilder({
    classes: ['notification'],
    attributes: { role: 'alert' },
  });
  private content = new ElementBuilder({ classes: ['notification__content'] });
  private closeButton = new ButtonBuilder({
    classes: ['notification__close'],
    content: '✕',
    events: [{ type: 'click', handler: () => this.close() }],
  });

  private timeoutId: number = 0;

  constructor(message: string, type: NotificationType = NOTIFICATION.TYPE.INFO) {
    this.container.addClass(`notification--${type}`);
    this.content.content = `${NOTIFICATION.EMOJI_MAP[type]} ${message}`;

    this.container.addChild(this.content, this.closeButton);
    document.body.appendChild(this.container.getElement());

    setTimeout(() => this.container.addClass('notification--visible'), NOTIFICATION.VISIBLE_DELAY);
    this.timeoutId = setTimeout(() => this.close(), NOTIFICATION.DURATION);
  }

  private close(): void {
    clearTimeout(this.timeoutId);
    this.container.removeClass('notification--visible');
    setTimeout(() => this.container.remove(), NOTIFICATION.ANIMATION_DELAY);
  }
}
