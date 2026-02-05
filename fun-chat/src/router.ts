import { HASHES, routes } from '@constants';
import { NotFoundPage } from '@pages';
import type { Hash, Route } from '@types';

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
    const hash = window.location.hash || HASHES.HOME;
    const route = this.routes.find((route) => route.hash === hash);

    const page = route ? route.page : new NotFoundPage();
    this.container.replaceChildren(page.build());
  }

  public navigate(path: Hash): void {
    window.location.hash = path;
  }
}
