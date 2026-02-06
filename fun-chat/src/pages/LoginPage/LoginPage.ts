import { PageBuilder } from '@utils';
import type { PageComponentOptions } from '@types';
import { LoginForm } from '@components';

export default class LoginPage extends PageBuilder {
  constructor({
    id = 'login-page',
    classes = ['login-page', 'container'],
  }: PageComponentOptions = {}) {
    super({ id, classes });

    this.render();
  }

  private render(): void {
    this.addChild(new LoginForm());
  }
}
