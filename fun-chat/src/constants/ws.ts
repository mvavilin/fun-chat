export const SERVER_EVENTS = {
  USER_LOGIN: 'USER_LOGIN',
  USER_LOGOUT: 'USER_LOGOUT',
  USER_EXTERNAL_LOGIN: 'USER_EXTERNAL_LOGIN',
  USER_EXTERNAL_LOGOUT: 'USER_EXTERNAL_LOGOUT',
  USER_ACTIVE: 'USER_ACTIVE',
  USER_INACTIVE: 'USER_INACTIVE',
  MSG_SEND: 'MSG_SEND',
  MSG_FROM_USER: 'MSG_FROM_USER',
  MSG_COUNT_NOT_READED_FROM_USER: 'MSG_COUNT_NOT_READED_FROM_USER',
  MSG_DELIVER: 'MSG_DELIVER',
  MSG_READ: 'MSG_READ',
  MSG_DELETE: 'MSG_DELETE',
  MSG_EDIT: 'MSG_EDIT',
  ERROR: 'ERROR',
};

export const SERVER_ERRORS = {
  ALREADY_LOGGED_IN: 'a user with this login is already authorized',
  ANOTHER_USER_AUTHORIZED: 'another user is already authorized in this connection',
  INCORRECT_PASSWORD: 'incorrect password',
  NO_SUCH_USER: 'there is no user with this login',
  USER_NOT_AUTHORIZED: 'the user was not authorized',
  SENDER_RECIPIENT_SAME: 'sender and recipient logins are the same',
  USER_DOES_NOT_EXIST: 'the user with the specified login does not exist',
  INCORRECT_MESSAGE_ID: 'incorrect message id',
  USER_NOT_RECIPIENT: 'user not recipient cannot be executed',
  USER_NOT_SENDER: 'user not sender cannot be executed',
  INCORRECT_REQUEST_STRUCTURE: 'incorrect request structure',
  INCORRECT_TYPE: 'incorrect type parameters',
  INCORRECT_PAYLOAD: 'incorrect payload parameters',
  UNAUTHORIZED_REQUEST: 'the user was not authorized cannot be executed',
  INTERNAL_ERROR: 'internal server error',
};

export const WS_ERRORS = {
  NOT_CONNECTED: 'WebSocket not connected',
  NOT_INITIALIZED: 'WebSocket not initialized',
  CONNECTION_FAILED: (url: string, error?: string) =>
    `Connection to ${url} failed${error ? `: ${error}` : ''}`,
  SEND_FAILED: 'Failed to send message',
  TIMEOUT: (type: string, id: string) => `Request ${type} (${id}) timeout`,
  DISCONNECTED: 'WebSocket disconnected',
  INVALID_MESSAGE: 'Invalid WebSocket message',
};

export const WS_CONFIG = {
  MAX_RECONNECT_ATTEMPTS: 5,
  RECONNECT_DELAY_MS: 3000,
  REQUEST_TIMEOUT_MS: 10000,
  BASE_URL: 'ws://localhost:4000',
};

export const PAYLOAD_FIELDS = {
  USER: 'user',
  ERROR: 'error',
  USERS: 'users',
  MESSAGES: 'messages',
  COUNT: 'count',
  MESSAGE: 'message',
} as const;
