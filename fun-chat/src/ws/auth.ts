import type { User, ServerResponse } from '@types';
import { SERVER_EVENTS } from '@constants';
import { authState } from '@state';
import { wsClient } from '@/wsClient';

export class AuthService {
  async login(login: string, password: string): Promise<User> {
    const response = await wsClient.request(SERVER_EVENTS.USER_LOGIN, {
      user: { login, password },
    });

    const user: User = response.payload.user;
    if (user.login && user.isLogined) authState.setUser(user.login, password, user.isLogined);
    return user;
  }

  async logout(): Promise<void> {
    const user = authState.user;
    if (user === null) return;

    await wsClient.request(SERVER_EVENTS.USER_LOGOUT, { user });
    authState.clearUser();
  }

  public onUserUpdate(callback: (user: User) => void): void {
    const handler = (response: ServerResponse): void => callback(response.payload.user);

    wsClient.subscribe(SERVER_EVENTS.USER_EXTERNAL_LOGIN, handler);
    wsClient.subscribe(SERVER_EVENTS.USER_EXTERNAL_LOGOUT, handler);
  }
}
