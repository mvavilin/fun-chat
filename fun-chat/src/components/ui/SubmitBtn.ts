import type { ButtonComponentOptions } from '@types';
import { ButtonBuilder } from '@utils';

export default class SubmitBtn extends ButtonBuilder {
  constructor({ id, classes = [], content, events, disabled }: ButtonComponentOptions = {}) {
    super({
      id,
      classes: [...classes],
      content: content,
      events,
      type: 'submit',
      disabled,
    });
  }
}
