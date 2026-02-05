import { PageBuilder, ElementBuilder } from '@utils';
import type { PageComponentOptions } from '@types';

export default class AboutPage extends PageBuilder {
  constructor({ id = 'about-page', classes = ['about-page'] }: PageComponentOptions = {}) {
    super({ id, classes });

    this.addChild(new ElementBuilder({ tag: 'h1', content: 'About Page' }));
  }
}
