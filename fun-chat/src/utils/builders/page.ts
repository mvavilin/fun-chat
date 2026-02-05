import { ElementBuilder } from '@utils';
import type { PageBuilderOptions } from '@types';

export default abstract class PageBuilder extends ElementBuilder {
  constructor({ id, classes = [] }: PageBuilderOptions = {}) {
    super({ id, classes: ['page', ...classes] });
  }

  public build = (): HTMLElement => this.getElement();
}
