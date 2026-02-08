import { HASHES, routes } from '@constants';
import { NotFoundPage } from '@pages';
import { authState } from '@state';
import type { Route, Hash } from '@types';
import { findRouteByHash, navigateTo } from '@utils';

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
    const hash = window.location.hash || HASHES.LOGIN;
    const route = this.resolveRoute(hash);
    const page = route ? route.page : new NotFoundPage();
    this.container.replaceChildren(page.build());
  }

  private resolveRoute(hash: string): Route | undefined {
    let route = findRouteByHash(this.routes, hash);
    if (route === undefined) return undefined;

    let redirectHash: Hash | null = null;

    if (route.auth === true && !authState.isAuth) redirectHash = HASHES.LOGIN;

    if (route.auth === false && authState.isAuth) redirectHash = HASHES.MAIN;

    if (redirectHash) {
      navigateTo(redirectHash);
      route = findRouteByHash(this.routes, redirectHash);
    }

    return route;
  }
}
