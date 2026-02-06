import { InputBuilder } from '@utils';
import { UI_TEXTS } from '@constants';

export default class LoginInput extends InputBuilder {
  constructor() {
    super({
      id: 'login',
      placeholder: UI_TEXTS.PAGES.LOGIN.LOGIN_PLACEHOLDER,
      type: 'text',
      attributes: { autocomplete: 'username' },
    });
  }
}
