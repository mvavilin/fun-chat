import { ElementBuilder, PageBuilder } from '@utils';
import type { PageComponentOptions } from '@types';
import { LoginForm } from '@components';

export default class LoginPage extends PageBuilder {
  private container: ElementBuilder = new ElementBuilder({
    classes: ['container', 'login-page-container'],
  });

  constructor({ id = 'login-page', classes = ['login-page'] }: PageComponentOptions = {}) {
    super({ id, classes });

    this.render();
  }

  private render(): void {
    this.container.addChild(new LoginForm());
    this.addChild(this.container);
  }
}
