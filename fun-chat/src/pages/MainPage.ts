import { PageBuilder, ElementBuilder } from '@utils';
import type { PageComponentOptions } from '@types';

export default class MainPage extends PageBuilder {
  constructor({
    id = 'main-page',
    classes = ['main-page', 'container'],
  }: PageComponentOptions = {}) {
    super({ id, classes });

    const title = new ElementBuilder({
      tag: 'h1',
      content: 'Main Page',
      classes: ['h1', 'page-title'],
    });

    this.addChild(title);
  }
}
