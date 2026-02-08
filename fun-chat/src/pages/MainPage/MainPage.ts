import { ElementBuilder, PageBuilder } from '@utils';
import type { PageComponentOptions } from '@types';
import { Header, Main, Footer } from '@components';

export default class MainPage extends PageBuilder {
  private container: ElementBuilder = new ElementBuilder({
    classes: ['container', 'main-page-container'],
  });
  private header = new Header();
  private main = new Main();
  private footer = new Footer();

  constructor({ id = 'main-page', classes = ['main-page'] }: PageComponentOptions = {}) {
    super({ id, classes });

    this.render();
  }

  private render(): void {
    this.container.addChild(this.header, this.main, this.footer);

    this.addChild(this.container);
  }
}
