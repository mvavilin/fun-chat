import { ElementBuilder, InputBuilder, ButtonBuilder } from '@utils';
import { PageTitle } from '@components/ui';
import { LoginInput, PasswordInput, LoginSubmitBtn } from '@components/LoginForm/components';
import { UI_TEXTS, CSS_SELECTORS } from '@constants';

export default class LoginForm extends ElementBuilder {
  private loginInput: InputBuilder;
  private passwordInput: InputBuilder;
  private submitBtn: ButtonBuilder;
  private title: ElementBuilder;

  constructor() {
    super({
      tag: 'form',
      classes: [CSS_SELECTORS.LOGIN_FORM],
    });

    this.title = new PageTitle(UI_TEXTS.PAGES.LOGIN.TITLE);
    this.loginInput = new LoginInput();
    this.passwordInput = new PasswordInput();
    this.submitBtn = new LoginSubmitBtn(() => this.handleSubmit());

    this.render();
  }

  private render(): void {
    this.addChild(this.title, this.loginInput, this.passwordInput, this.submitBtn);
  }

  private handleSubmit(): void {
    const login = this.loginInput.value;
    const password = this.passwordInput.value;

    console.log('Login:', login);
    console.log('Password:', password);
  }
}
