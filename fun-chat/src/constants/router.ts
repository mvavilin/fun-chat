import type { Route } from '@types';
import { LoginPage, HomePage, AboutPage } from '@pages';

export const HASHES = {
  LOGIN: '#/login',
  MAIN: '#/main',
  ABOUT: '#/about',
};

export const routes: Route[] = [
  { hash: HASHES.LOGIN, page: new LoginPage() },
  { hash: HASHES.MAIN, page: new HomePage() },
  { hash: HASHES.ABOUT, page: new AboutPage() },
];
