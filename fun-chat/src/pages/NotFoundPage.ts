import { PageBuilder, ElementBuilder } from '@utils';
import type { PageComponentOptions } from '@types';
import { UI_TEXTS } from '@constants';

export default class NotFoundPage extends PageBuilder {
  constructor({ id = 'not-found-page', classes = ['not-found-page'] }: PageComponentOptions = {}) {
    super({ id, classes });

    this.addChild(new ElementBuilder({ tag: 'h1', content: UI_TEXTS.PAGES.NOT_FOUND }));
  }
}
