import { HTTP_METHODS, API_MESSAGES, HTTP_STATUSES } from '@constants';
import type { HttpMethod, ApiMethods } from '@types';

export function handleHttpError(method: string, url: string, status: number): never {
  switch (status) {
    case HTTP_STATUSES.BAD_REQUEST:
      throw new Error(API_MESSAGES.BAD_REQUEST(method, url, status));
    case HTTP_STATUSES.UNAUTHORIZED:
      throw new Error(API_MESSAGES.UNAUTHORIZED(method, url, status));
    case HTTP_STATUSES.FORBIDDEN:
      throw new Error(API_MESSAGES.FORBIDDEN(method, url, status));
    case HTTP_STATUSES.NOT_FOUND:
      throw new Error(API_MESSAGES.NOT_FOUND(method, url, status));
    case HTTP_STATUSES.CONFLICT:
      throw new Error(API_MESSAGES.CONFLICT(method, url, status));
    case HTTP_STATUSES.SERVER_ERROR:
      throw new Error(API_MESSAGES.SERVER_ERROR(method, url, status));
    default:
      throw new Error(API_MESSAGES.REQUEST_ERROR(method, url, status));
  }
}

export async function apiRequest<T>(
  method: HttpMethod,
  url: string,
  data?: unknown
): Promise<T | null> {
  const headers = { 'Content-Type': 'application/json' };
  const options: RequestInit = { method, headers };

  if (method !== HTTP_METHODS.GET && method !== HTTP_METHODS.HEAD && data !== undefined)
    options.body = JSON.stringify(data);

  try {
    const response = await fetch(url, options);

    if (response.ok) {
      const text = await response.text();
      if (text === '') return null;

      try {
        return JSON.parse(text);
      } catch {
        throw new Error(API_MESSAGES.INVALID_JSON(method, url, response.status));
      }
    } else {
      handleHttpError(method, url, response.status);
    }
  } catch (error: unknown) {
    if (error instanceof TypeError) throw new Error(API_MESSAGES.NETWORK_ERROR(method, url));
    return null;
  }
}

export const api: ApiMethods = {
  get: (url) => apiRequest(HTTP_METHODS.GET, url),
  post: (url, data) => apiRequest(HTTP_METHODS.POST, url, data),
  put: (url, data) => apiRequest(HTTP_METHODS.PUT, url, data),
  delete: (url, data) => apiRequest(HTTP_METHODS.DELETE, url, data),
};
