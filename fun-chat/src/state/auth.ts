import type { User } from '@types';
import { StorageService } from '@services';

const userStorage = new StorageService<User>('user');

class AuthState {
  private _user: User = { login: null, password: null, isLogined: false };
  private listeners: Array<(user: User) => void> = [];

  constructor() {
    const stored = userStorage.key;
    if (stored) this._user = stored;
  }

  public subscribe(listener: (user: User) => void) {
    this.listeners.push(listener);
    listener(this._user);
  }

  public setUser = (login: string, password: string, isLogined = true): void => {
    this._user = { login, password, isLogined };
    userStorage.key = this._user;
    this.notifyListeners();
  };

  public clearUser = (): void => {
    this._user = { login: null, password: null, isLogined: false };
    userStorage.clear();
    this.notifyListeners();
  };

  public get isAuth(): boolean {
    return this._user.isLogined === true;
  }

  public get user(): User {
    return this._user;
  }

  public get login(): string {
    return this._user.login ? this._user.login : '';
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener(this._user));
  }
}

export const authState = new AuthState();
