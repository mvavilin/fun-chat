import { PageBuilder, ElementBuilder } from '@utils';
import type { PageComponentOptions } from '@types';

export default class NotFoundPage extends PageBuilder {
  constructor({ id = 'not-found-page', classes = ['not-found-page'] }: PageComponentOptions = {}) {
    super({ id, classes });

    this.addChild(new ElementBuilder({ tag: 'h1', content: '404 - Page not found' }));
  }
}
