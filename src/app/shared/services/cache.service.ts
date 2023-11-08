import { inject, Injectable } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';

interface ICachedData<T> {
  data: T;
  expireOn?: number;
}

@Injectable({ providedIn: 'root' })
export class CacheService {
  private readonly _transferState = inject(TransferState);

  public get<T>(key: string): T | undefined {
    if (this.isEmpty) return;

    const cachedData = this._transferState.get(
      makeStateKey<ICachedData<T>>(key),
      undefined
    );

    if (!cachedData) return;

    const { data, expireOn } = cachedData;
    if (!expireOn || expireOn > Date.now()) {
      return data;
    } else {
      this.remove(key);
      return undefined;
    }
  }

  public set<T>(key: string, data: T, secondsToExpire?: number): void {
    let expirationTimestamp: number | undefined;
    if (secondsToExpire) {
      expirationTimestamp = Date.now() + secondsToExpire * 1000;
    }

    this._transferState.set(makeStateKey<ICachedData<T>>(key), {
      data,
      expireOn: expirationTimestamp,
    });
  }

  public remove(key: string): void {
    this._transferState.remove(makeStateKey(key));
  }

  public hasKey(key: string): boolean {
    return this._transferState.hasKey(makeStateKey(key));
  }

  public get isEmpty(): boolean {
    return this._transferState.isEmpty;
  }
}
