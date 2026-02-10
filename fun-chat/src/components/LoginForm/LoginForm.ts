import { ElementBuilder, navigateTo } from '@utils';
import { authService, type AuthService } from '@ws';
import { PageTitle } from '@components/ui';
import { UI_TEXTS } from '@constants';
import { LoginInput, PasswordInput, LoginSubmitBtn } from '@components/LoginForm/components';

export default class LoginForm extends ElementBuilder {
  private authService: AuthService = authService;

  private loginInput: LoginInput = new LoginInput();
  private passwordInput: PasswordInput = new PasswordInput();
  private submitBtn: LoginSubmitBtn = new LoginSubmitBtn(() => this.handleSubmit());
  private title: ElementBuilder = new PageTitle(UI_TEXTS.PAGES.LOGIN.TITLE);

  constructor() {
    super({ tag: 'form', classes: ['login-form'] });

    this.addEvent({
      type: 'submit',
      handler: (event) => {
        event.preventDefault();
        this.handleSubmit();
      },
    });

    this.render();
  }

  private render(): void {
    this.addChild(this.title, this.loginInput, this.passwordInput, this.submitBtn);
  }

  public async handleSubmit(): Promise<void> {
    const login = this.loginInput.value;
    const password = this.passwordInput.value;

    if (!this.loginInput.isValid() || !this.passwordInput.isValid()) return;

    await this.authService.login(login, password);

    navigateTo();
  }
}
