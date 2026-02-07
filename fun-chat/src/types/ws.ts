import { SERVER_EVENTS, SERVER_ERRORS } from '@constants';

export type WSRequest<TPayload = unknown> = {
  id: string | null;
  type: ServerEventType;
  payload: TPayload;
};

export type WSErrorResponse = {
  id: string | null;
  type: 'ERROR';
  payload: {
    error: ServerErrorMessage;
  };
};

export type ServerEventType = (typeof SERVER_EVENTS)[keyof typeof SERVER_EVENTS];
export type ServerErrorMessage = (typeof SERVER_ERRORS)[keyof typeof SERVER_ERRORS] | string;

export type User = {
  login: string | null;
  isLogined: boolean;
};

export type UserLoginRequest = WSRequest<{
  user: {
    login: string;
    password: string;
  };
}>;

export type UserLoginResponse = WSRequest<{
  user: User;
}>;

export type UserLogoutRequest = UserLoginRequest;
export type UserLogoutResponse = UserLoginResponse;

export type UserListResponse = WSRequest<{
  users: User[];
}>;

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

export type MsgSendRequest = WSRequest<{
  message: {
    to: string;
    text: string;
  };
}>;

export type MsgSendResponse = WSRequest<{
  message: Message;
}>;

export type MsgFromUserRequest = WSRequest<{
  user: {
    login: string;
  };
}>;

export type MsgFromUserResponse = WSRequest<{
  messages: Message[];
}>;

export type MsgUnreadCountResponse = WSRequest<{
  count: number;
}>;

export type MsgStatusUpdateResponse = WSRequest<{
  message: {
    id: string;
    status: MessageStatus;
  };
}>;

export type ServerResponse =
  | UserLoginResponse
  | UserLogoutResponse
  | UserListResponse
  | MsgSendResponse
  | MsgFromUserResponse
  | MsgUnreadCountResponse
  | MsgStatusUpdateResponse
  | WSErrorResponse;
