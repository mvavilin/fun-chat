import { HTTP_STATUSES, HTTP_METHODS } from '@constants';

export type HttpStatus = (typeof HTTP_STATUSES)[keyof typeof HTTP_STATUSES];
export type HttpMethod = (typeof HTTP_METHODS)[keyof typeof HTTP_METHODS];

type ApiFn = <T>(url: string, data?: Record<string, unknown>) => Promise<T | null>;

export type ApiMethods = {
  get: ApiFn;
  post: ApiFn;
  put: ApiFn;
  delete: ApiFn;
};
