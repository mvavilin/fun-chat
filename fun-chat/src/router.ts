import { HASHES, routes } from '@constants';
import { NotFoundPage } from '@pages';
import { authState } from '@state';
import type { Route } from '@types';
import { findRouteByHash } from '@utils';

export default class Router {
  private routes: Route[];
  private container: HTMLDivElement;

  constructor(containerId = 'app') {
    const container = document.getElementById(containerId);
    if (container instanceof HTMLDivElement) {
      this.container = container;
      this.routes = routes;
    } else {
      throw new Error('App container not found');
    }
  }

  public init(): void {
    window.addEventListener('hashchange', () => this.render());
    window.addEventListener('load', () => this.render());
  }

  private render(): void {
    const hash = window.location.hash || HASHES.MAIN;
    const route = this.resolveRoute(hash);
    const page = route ? route.page : new NotFoundPage();
    this.container.replaceChildren(page.build());
  }

  private resolveRoute(hash: string): Route | undefined {
    let route = findRouteByHash(this.routes, hash);
    if (route === undefined) return undefined;

    let redirectHash: string | null = null;

    switch (route.auth) {
      case true:
        if (!authState.isAuth) redirectHash = HASHES.LOGIN;
        break;
      case false:
        if (authState.isAuth) redirectHash = HASHES.MAIN;
        break;
    }

    if (redirectHash) {
      window.location.hash = redirectHash;
      route = findRouteByHash(this.routes, redirectHash);
    }

    return route;
  }
}
