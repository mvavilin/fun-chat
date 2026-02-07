import type { Hash, Route } from '@types';

export const navigateTo = (hash: Hash): void => {
  window.location.hash = hash;
};

export const findRouteByHash = (routes: Route[], hash: string): Route | undefined =>
  routes.find((route) => route.hash === hash);
