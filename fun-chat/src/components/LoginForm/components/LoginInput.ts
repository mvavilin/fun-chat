import { InputBuilder, isFieldValid } from '@utils';
import { UI_TEXTS, VALIDATION } from '@constants';

export default class LoginInput extends InputBuilder {
  constructor() {
    super({
      id: 'login',
      placeholder: UI_TEXTS.PAGES.LOGIN.LOGIN_PLACEHOLDER,
      type: 'text',
      attributes: { autocomplete: 'username' },
      events: [{ type: 'input', handler: () => this.isValid() }],
    });
  }

  public isValid = (): boolean => isFieldValid(this, VALIDATION.LOGIN);
}
