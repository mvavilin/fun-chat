import { SERVER_EVENTS, SERVER_ERRORS } from '@constants';

export type ServerEventType = (typeof SERVER_EVENTS)[keyof typeof SERVER_EVENTS];
type ServerErrorMessage = (typeof SERVER_ERRORS)[keyof typeof SERVER_ERRORS] | string;

type WSRequest<TPayload = unknown> = {
  id: string | null;
  type: ServerEventType;
  payload: TPayload;
};

export type WSErrorResponse = {
  id: string | null;
  type: ServerEventType;
  payload: {
    error: ServerErrorMessage;
  };
};

export type User = {
  login: string | null;
  isLogined: boolean;
};

type MessageStatus = {
  isDelivered?: boolean;
  isReaded?: boolean;
  isEdited?: boolean;
  isDeleted?: boolean;
};

type Message = {
  id: string;
  from: string;
  to: string;
  text: string;
  datetime: number;
  status: MessageStatus;
};

export type UserLoginRequest = WSRequest<{ user: { login: string; password: string } }>;
export type UserLoginResponse = WSRequest<{ user: User }>;

export type UserLogoutRequest = UserLoginRequest;
type UserLogoutResponse = UserLoginResponse;

type UserListResponse = WSRequest<{ users: User[] }>;

export type MsgSendRequest = WSRequest<{ message: { to: string; text: string } }>;
type MsgSendResponse = WSRequest<{ message: Message }>;

export type MsgFromUserRequest = WSRequest<{ user: { login: string } }>;
type MsgFromUserResponse = WSRequest<{ messages: Message[] }>;

type MsgUnreadCountResponse = WSRequest<{ count: number }>;

type MsgStatusUpdateResponse = WSRequest<{ message: { id: string; status: MessageStatus } }>;

export type ServerResponse =
  | UserLoginResponse
  | UserLogoutResponse
  | UserListResponse
  | MsgSendResponse
  | MsgFromUserResponse
  | MsgUnreadCountResponse
  | MsgStatusUpdateResponse
  | WSErrorResponse;

export type ServerEventHandler = (data: ServerResponse) => void;
