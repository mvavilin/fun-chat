import { ElementBuilder, PageBuilder } from '@utils';
import type { PageComponentOptions } from '@types';
import { LoginForm } from '@components';

export default class LoginPage extends PageBuilder {
  private container: ElementBuilder = new ElementBuilder({
    classes: ['container', 'login-page-container'],
  });
  private loginForm: LoginForm = new LoginForm();

  constructor({ id = 'login-page', classes = ['login-page'] }: PageComponentOptions = {}) {
    super({ id, classes });

    this.render();
    this.bindEnter();
  }

  private render(): void {
    this.container.addChild(this.loginForm);
    this.addChild(this.container);
  }

  private bindEnter(): void {
    document.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key !== 'Enter') return;

      event.preventDefault();
      this.loginForm.handleSubmit();
    });
  }
}
