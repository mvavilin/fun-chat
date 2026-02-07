import type { PageBuilder } from '@utils';
import { HASHES } from '@constants';

export type Hash = (typeof HASHES)[keyof typeof HASHES];

export type Route = {
  hash: Hash;
  page: PageBuilder;
  auth: boolean | null;
};
