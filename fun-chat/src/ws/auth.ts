import type { User, ServerResponse } from '@types';
import { SERVER_EVENTS, PAYLOAD_FIELDS, HASHES } from '@constants';
import { authState } from '@state';
import { wsClient } from '@/wsClient';
import { type ButtonBuilder, navigateTo } from '@utils';

export class AuthService {
  async login(login: string, password: string): Promise<User | null> {
    const response = await wsClient.request(SERVER_EVENTS.USER_LOGIN, {
      user: { login, password },
    });

    const user = PAYLOAD_FIELDS.USER in response.payload ? response.payload.user : null;
    if (user === null) return null;

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
    const handler = (response: ServerResponse): void => {
      const user = PAYLOAD_FIELDS.USER in response.payload ? response.payload.user : null;
      if (user === null) return;

      callback(user);
    };

    wsClient.subscribe(SERVER_EVENTS.USER_EXTERNAL_LOGIN, handler);
    wsClient.subscribe(SERVER_EVENTS.USER_EXTERNAL_LOGOUT, handler);
  }
}

export const authService: AuthService = new AuthService();

export const closeApp = async (button: ButtonBuilder): Promise<void> => {
  button.disabled = true;
  await authService.logout();
  button.disabled = false;
  navigateTo(HASHES.LOGIN);
};
