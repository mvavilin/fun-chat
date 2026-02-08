import type { User } from '@types';
import { StorageService } from '@services';

const userStorage = new StorageService<User>('user');

class AuthState {
  private _user: User = { login: null, password: null, isLogined: false };

  constructor() {
    const stored = userStorage.key;
    if (stored) this._user = stored;
  }

  public setUser = (login: string, password: string, isLogined = true): void => {
    this._user = { login, password, isLogined };
    userStorage.key = this._user;
  };

  public clearUser = (): void => {
    this._user = { login: null, password: null, isLogined: false };
    userStorage.clear();
  };

  public get isAuth(): boolean {
    return this._user.isLogined === true;
  }

  public get user(): User {
    return this._user;
  }
}

export const authState = new AuthState();
