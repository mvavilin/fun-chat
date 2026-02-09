import { ElementBuilder } from '@utils';
import type { InputBuilderOptions } from '@types';

export default class InputBuilder extends ElementBuilder {
  constructor({
    id,
    classes = [],
    attributes = {},
    events,
    type = 'text',
    value,
    placeholder,
    disabled,
  }: InputBuilderOptions = {}) {
    super({
      tag: 'input',
      id,
      classes: ['input', ...classes],
      attributes,
      events,
    });

    this.type = type;
    if (value) this.value = value;
    if (placeholder) this.placeholder = placeholder;
    if (disabled) this.disabled = disabled;
  }

  public getInput = (): HTMLInputElement | null => {
    const element = this.getElement();
    return element instanceof HTMLInputElement ? element : null;
  };

  public set type(value: HTMLInputElement['type']) {
    const input = this.getInput();
    if (input) input.type = value;
  }

  public get value(): string {
    const input = this.getInput();
    return input ? input.value.trim() : '';
  }

  public set value(value: string) {
    const input = this.getInput();
    if (input) input.value = value;
  }

  public set placeholder(value: string) {
    const input = this.getInput();
    if (input) input.placeholder = value;
  }

  public get disabled(): boolean {
    const input = this.getInput();
    return input ? input.disabled : false;
  }

  public set disabled(state: boolean) {
    const input = this.getInput();
    if (input) input.disabled = state;
  }

  override clear = (): void => {
    const input = this.getInput();
    if (input) input.value = '';
  };

  // TODO: Move methods to TextInput class ↓

  public isEmpty = (): boolean => {
    return this.value.length === 0;
  };

  public isValidByRegex = (pattern: RegExp): boolean => {
    return pattern.test(this.value);
  };

  public hasLengthBetween = (min: number, max: number): boolean => {
    const len = this.value.length;
    return len >= min && len <= max;
  };
}
