import { ElementBuilder } from '@utils';
import { CSS_SELECTORS } from '@constants';

export default class Title extends ElementBuilder {
  constructor(title: string) {
    super({
      tag: 'h1',
      classes: [CSS_SELECTORS.PAGE_TITLE],
      content: title,
    });
  }
}
