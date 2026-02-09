import { ElementBuilder } from '@utils';

export default class Chat extends ElementBuilder {
  constructor() {
    super({ classes: ['chat'] });

    this.render();
  }

  private render(): void {}
}
