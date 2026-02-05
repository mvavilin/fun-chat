import { PageBuilder, ElementBuilder } from '@utils';
import type { PageComponentOptions } from '@types';

export default class LoginPage extends PageBuilder {
  constructor({ id = 'login-page', classes = ['login-page'] }: PageComponentOptions = {}) {
    super({ id, classes });

    this.addChild(new ElementBuilder({ tag: 'h1', content: 'Login Page' }));
  }
}
