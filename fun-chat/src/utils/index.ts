import { WSClient } from '@utils/ws';
export { WSClient };

import { ElementBuilder, ButtonBuilder, InputBuilder, PageBuilder } from '@utils/builders';
export { ElementBuilder, ButtonBuilder, InputBuilder, PageBuilder };

import { isFieldValid } from '@utils/validation';
export { isFieldValid };

import { findRouteByHash, navigateTo } from '@utils/routing';
export { findRouteByHash, navigateTo };

export const capitalize = (string: string): string =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const generateId = (): string =>
  Date.now().toString(36) + Math.random().toString(36).slice(2);
