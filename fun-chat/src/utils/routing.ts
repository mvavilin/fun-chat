import type { Hash, Route } from '@types';
import { HASHES } from '@constants';

export const navigateTo = (hash: Hash = HASHES.MAIN): void => {
  window.location.hash = hash;
};

export const findRouteByHash = (routes: Route[], hash: string): Route | undefined =>
  routes.find((route) => route.hash === hash);
