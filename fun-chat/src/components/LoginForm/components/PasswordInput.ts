import { InputBuilder, isFieldValid } from '@utils';
import { UI_TEXTS, VALIDATION } from '@constants';

export default class PasswordInput extends InputBuilder {
  constructor() {
    super({
      id: 'password',
      placeholder: UI_TEXTS.PAGES.LOGIN.PASSWORD_PLACEHOLDER,
      type: 'password',
      attributes: { autocomplete: 'current-password' },
      events: [{ type: 'input', handler: () => this.isValid() }],
    });
  }

  public isValid = (): boolean => {
    return isFieldValid(this, VALIDATION.PASSWORD);
  };
}
