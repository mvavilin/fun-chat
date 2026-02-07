export const HTTP_STATUSES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  SERVER_ERROR: 500,
};

export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
  HEAD: 'HEAD',
};

export const API_MESSAGES = {
  INVALID_JSON: (method: string, url: string, status: number) =>
    `${method.toUpperCase()} ${url} ${status} (Invalid JSON in response)`,
  NETWORK_ERROR: (method: string, url: string, message?: string) =>
    `${method.toUpperCase()} ${url} Network error${message ? `: ${message}` : ''}`,
  EMPTY_RESPONSE: (method: string, url: string, status: number) =>
    `${method.toUpperCase()} ${url} ${status} (Response body is empty)`,
  BAD_REQUEST: (method: string, url: string, status: number) =>
    `${method.toUpperCase()} ${url} ${status} (Bad request)`,
  UNAUTHORIZED: (method: string, url: string, status: number) =>
    `${method.toUpperCase()} ${url} ${status} (Unauthorized)`,
  FORBIDDEN: (method: string, url: string, status: number) =>
    `${method.toUpperCase()} ${url} ${status} (Forbidden)`,
  NOT_FOUND: (method: string, url: string, status: number) =>
    `${method.toUpperCase()} ${url} ${status} (Not Found)`,
  CONFLICT: (method: string, url: string, status: number) =>
    `${method.toUpperCase()} ${url} ${status} (Data conflict)`,
  SERVER_ERROR: (method: string, url: string, status: number) =>
    `${method.toUpperCase()} ${url} ${status} (Server error)`,
  REQUEST_ERROR: (method: string, url: string, status: number) =>
    `${method.toUpperCase()} ${url} ${status} (Request error)`,
};
