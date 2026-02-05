import type { Hash } from '@types';

export const navigateTo = (hash: Hash): void => {
  window.location.hash = hash;
};
