import type { ButtonComponentOptions } from '@types';
import { ButtonBuilder } from '@utils';

export default class SubmitBtn extends ButtonBuilder {
  constructor({ id, classes = [], content, events }: ButtonComponentOptions = {}) {
    super({
      id,
      classes: [...classes],
      content: content,
      type: 'submit',
      events,
    });
  }
}
