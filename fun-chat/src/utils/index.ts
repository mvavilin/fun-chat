import { ElementBuilder, ButtonBuilder, InputBuilder, PageBuilder } from '@utils/builders';

export { ElementBuilder, ButtonBuilder, InputBuilder, PageBuilder };

export const capitalize = (string: string): string =>
  string.charAt(0).toUpperCase() + string.slice(1);
