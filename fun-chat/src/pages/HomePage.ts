import { PageBuilder, ElementBuilder } from '@utils';
import type { PageComponentOptions } from '@types';

export default class HomePage extends PageBuilder {
  constructor({
    id = 'home-page',
    classes = ['home-page', 'container'],
  }: PageComponentOptions = {}) {
    super({ id, classes });

    const title = new ElementBuilder({
      tag: 'h1',
      content: 'Home Page',
      classes: ['h1', 'page-title'],
    });

    this.addChild(title);
  }
}
