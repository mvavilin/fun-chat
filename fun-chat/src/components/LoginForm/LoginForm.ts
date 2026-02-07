import { ElementBuilder } from '@utils';
import { PageTitle } from '@components/ui';
import { UI_TEXTS } from '@constants';
import { LoginInput, PasswordInput, LoginSubmitBtn } from '@components/LoginForm/components';

export default class LoginForm extends ElementBuilder {
  private loginInput: LoginInput;
  private passwordInput: PasswordInput;
  private submitBtn: LoginSubmitBtn;
  private title: ElementBuilder;

  constructor() {
    super({ tag: 'form', classes: ['login-form'] });

    this.title = new PageTitle(UI_TEXTS.PAGES.LOGIN.TITLE);
    this.loginInput = new LoginInput();
    this.passwordInput = new PasswordInput();
    this.submitBtn = new LoginSubmitBtn(() => this.handleSubmit());

    this.render();
  }

  private render(): void {
    this.loginInput.value = 'Mikhail';
    this.passwordInput.value = 'password123';

    this.addChild(this.title, this.loginInput, this.passwordInput, this.submitBtn);
  }

  private async handleSubmit(): Promise<void> {
    if (!this.loginInput.isValid() || !this.passwordInput.isValid()) return;
  }
}
