import type { User, ServerResponse } from '@types';
import { SERVER_EVENTS, PAYLOAD_FIELDS, HASHES, WS_MESSAGES, NOTIFICATION, SERVER_ERRORS } from '@constants';
import { Notification } from '@components/ui';
import { authState } from '@state';
import { wsClient } from '@/wsClient';
import { type ButtonBuilder, navigateTo } from '@utils';

export class AuthService {
  async login(login: string, password: string): Promise<User | null> {
    try {
      const response = await wsClient.request(SERVER_EVENTS.USER_LOGIN, {
        user: { login, password },
      });

      const user = PAYLOAD_FIELDS.USER in response.payload ? response.payload.user : null;
      if (user === null) return null;

      if (user.isLogined) authState.setUser(login, password, user.isLogined);
      new Notification(WS_MESSAGES.AUTH_SUCCESS, NOTIFICATION.TYPE.SUCCESS);

      return user;
    } catch (error) {
      const message = error instanceof Error ? error.message : SERVER_ERRORS.INTERNAL_ERROR;
      new Notification(message, NOTIFICATION.TYPE.ERROR);

      return null;
    }
  }

  async logout(): Promise<void> {
    try {
      const user = authState.user;
      if (user === null) return;

      await wsClient.request(SERVER_EVENTS.USER_LOGOUT, { user });
      authState.clearUser();
    } catch (error) {
      const message = error instanceof Error ? error.message : SERVER_ERRORS.INTERNAL_ERROR;
      new Notification(message, NOTIFICATION.TYPE.ERROR);
    }
  }

  public onUserUpdate(callback: (user: User) => void): void {
    const handler = (response: ServerResponse): void => {
      try {
        const user = PAYLOAD_FIELDS.USER in response.payload ? response.payload.user : null;
        if (user === null) return;

        callback(user);
      } catch {
        new Notification(SERVER_ERRORS.INTERNAL_ERROR, NOTIFICATION.TYPE.ERROR);
      }
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
