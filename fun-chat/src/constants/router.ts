import type { Route } from '@types';
import { LoginPage, HomePage, AboutPage } from '@pages';

export const HASHES = {
  LOGIN: '#/login',
  HOME: '#/home',
  ABOUT: '#/about',
} as const;

export const routes: Route[] = [
  { hash: HASHES.LOGIN, page: new LoginPage() },
  { hash: HASHES.HOME, page: new HomePage() },
  { hash: HASHES.ABOUT, page: new AboutPage() },
];
