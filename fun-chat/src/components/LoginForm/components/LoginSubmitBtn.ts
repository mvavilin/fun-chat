import { SubmitBtn } from '@components/ui';
import { CSS_SELECTORS, UI_TEXTS } from '@constants';

export default class LoginSubmitBtn extends SubmitBtn {
  constructor(handler: () => void) {
    super({
      id: CSS_SELECTORS.LOGIN_SUBMIT,
      classes: [CSS_SELECTORS.BTN_PRIMARY, CSS_SELECTORS.LOGIN_FORM_SUBMIT],
      content: UI_TEXTS.PAGES.LOGIN.BUTTON,
      events: [{ type: 'click', handler }],
      disabled: false,
    });
  }
}
