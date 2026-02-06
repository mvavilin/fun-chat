import { InputBuilder } from '@utils';
import { UI_TEXTS } from '@constants';

export default class PasswordInput extends InputBuilder {
  constructor() {
    super({
      id: 'password',
      placeholder: UI_TEXTS.PAGES.LOGIN.PASSWORD_PLACEHOLDER,
      type: 'password',
      attributes: { autocomplete: 'current-password' },
    });
  }
}
