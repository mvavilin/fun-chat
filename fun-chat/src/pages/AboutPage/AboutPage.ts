import { ElementBuilder, PageBuilder } from '@utils';
import type { PageComponentOptions } from '@types';
import { Header, About, Footer } from '@components';

export default class AboutPage extends PageBuilder {
  private container: ElementBuilder = new ElementBuilder({
    classes: ['container', 'about-page-container'],
  });
  private header = new Header();
  private about = new About();
  private footer = new Footer();

  constructor({ id = 'about-page', classes = ['about-page'] }: PageComponentOptions = {}) {
    super({ id, classes });

    this.render();
  }

  private render(): void {
    this.container.addChild(this.header, this.about, this.footer);

    this.addChild(this.container);
  }
}
