export class StorageService<T> {
  private _key: string;

  constructor(key: string) {
    this._key = key;
  }

  public set key(item: T) {
    sessionStorage.setItem(this._key, JSON.stringify(item));
  }

  public get key(): T | null {
    const stored = sessionStorage.getItem(this._key);
    return stored ? JSON.parse(stored) : null;
  }

  public clear(): void {
    sessionStorage.removeItem(this._key);
  }
}
