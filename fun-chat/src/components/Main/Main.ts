import { ElementBuilder } from '@utils';
import { Sidebar } from '@components';
import { Chat } from '@components';

export default class Main extends ElementBuilder {
  private container = new ElementBuilder({ classes: ['container'] });
  private contentWrapper = new ElementBuilder({ classes: ['content-wrapper'] });
  private sidebar = new Sidebar();
  private chatComponent = new Chat();

  constructor() {
    super({ tag: 'main', classes: ['main-content'] });

    this.render();
  }

  private render(): void {
    this.contentWrapper.addChild(this.sidebar, this.chatComponent);
    this.container.addChild(this.contentWrapper);
    this.addChild(this.container);
  }
}
