import { ElementBuilder, ButtonBuilder, InputBuilder, PageBuilder } from '@utils/builders';
export { ElementBuilder, ButtonBuilder, InputBuilder, PageBuilder };

import { WSClient } from '@utils/ws';
export { WSClient };

import { isFieldValid } from '@utils/validation';
export { isFieldValid };

import { findRouteByHash } from '@utils/routing';
export { findRouteByHash };

export const capitalize = (string: string): string =>
  string.charAt(0).toUpperCase() + string.slice(1);
