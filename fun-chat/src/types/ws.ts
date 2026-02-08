import { SERVER_EVENTS, SERVER_ERRORS } from '@constants';

export type ServerEventType = (typeof SERVER_EVENTS)[keyof typeof SERVER_EVENTS];
export type ServerErrorMessage = (typeof SERVER_ERRORS)[keyof typeof SERVER_ERRORS] | string;

export type ServerRequest<TPayload> = {
  id: string | null;
  type: ServerEventType;
  payload: TPayload;
};

export type User = {
  login: string | null;
  password?: string | null;
  isLogined?: boolean;
};

export type MessageStatus = {
  isDelivered?: boolean;
  isReaded?: boolean;
  isEdited?: boolean;
  isDeleted?: boolean;
};

export type Message = {
  id: string;
  from: string;
  to: string;
  text: string;
  datetime: number;
  status: MessageStatus;
};

type UserLoginPayload = { user: User };
type UserLogoutPayload = UserLoginPayload;
type MsgSendPayload = { message: { to: string; text: string } };
type MsgFromUserPayload = { user: { login: string } };

export type ServerRequestPayloads =
  | UserLoginPayload
  | UserLogoutPayload
  | MsgSendPayload
  | MsgFromUserPayload;

type ServerErrorPayload = { error: ServerErrorMessage };

export type ServerResponsePayloads =
  | UserLoginPayload
  | UserLogoutPayload
  | { users: User[] }
  | { message: Message }
  | { messages: Message[] }
  | { count: number }
  | { message: { id: string; status: MessageStatus } }
  | ServerErrorPayload;

export type ServerResponse = ServerRequest<ServerResponsePayloads>;
export type ServerEventHandler = (data: ServerResponse) => void;
