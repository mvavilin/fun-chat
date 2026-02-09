import { ElementBuilder } from '@utils';
import type { ButtonBuilderOptions } from '@types';

export default class ButtonBuilder extends ElementBuilder {
  constructor({ id, classes = [], content, events, type = 'button', disabled, children }: ButtonBuilderOptions) {
    super({
      tag: 'button',
      id,
      classes: ['btn', ...classes],
      content: content,
      events: events,
      children,
    });

    this.type = type;
    if (disabled) this.disabled = true;
  }

  private getButton = (): HTMLButtonElement | null => {
    const element = this.getElement();
    return element instanceof HTMLButtonElement ? element : null;
  };

  public set type(value: HTMLButtonElement['type']) {
    const button = this.getButton();
    if (button) button.type = value;
  }

  public get disabled(): boolean {
    const button = this.getButton();
    return button ? button.disabled : false;
  }

  public set disabled(state: boolean) {
    const button = this.getButton();
    if (button) button.disabled = state;
  }

  public enable = (): void => {
    this.disabled = false;
  };
  public disable = (): void => {
    this.disabled = true;
  };
}
