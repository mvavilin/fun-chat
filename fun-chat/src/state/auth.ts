import type { User } from '@types';

class AuthState {
  private _user: User = { login: null, isLogined: false };

  public setUser = (login: string): void => {
    this._user = { login, isLogined: true };
  };

  public clearUser = (): void => {
    this._user = { login: null, isLogined: false };
  };

  public get isAuth(): boolean {
    return this._user.isLogined;
  }

  public get user(): User {
    return this._user;
  }
}

export const authState = new AuthState();
