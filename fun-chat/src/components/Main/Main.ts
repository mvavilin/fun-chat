import { ElementBuilder } from '@utils';
// import { Sidebar, Chat } from '@components';
import { Sidebar } from '@components';

export default class Main extends ElementBuilder {
  private container = new ElementBuilder({ classes: ['container'] });
  private contentWrapper = new ElementBuilder({ classes: ['main-content-wrapper'] });
  private sidebar = new Sidebar();
  // private chat = new Chat();

  constructor() {
    super({ tag: 'main', classes: ['main-content'] });

    this.render();
  }

  private render(): void {
    this.contentWrapper.addChild(this.sidebar);
    // this.contentWrapper.addChild(this.sidebar, this.chat);
    this.container.addChild(this.contentWrapper);
    this.addChild(this.container);
  }
}
