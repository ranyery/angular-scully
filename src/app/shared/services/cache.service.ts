import { Injectable } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { cloneDeep } from 'lodash';

interface ICachedData<T> {
  data: T;
  expireOn?: number;
}

@Injectable({ providedIn: 'root' })
export class CacheService {
  private readonly _keys = new Set<string>();

  constructor(private _transferState: TransferState) {}

  public get<T>(key: string): T | undefined {
    if (this.isEmpty) return;

    const cachedData = this._transferState.get(
      makeStateKey<ICachedData<T>>(key),
      undefined
    );

    if (!cachedData) return;

    const { data, expireOn } = cachedData;
    if (!expireOn || expireOn > Date.now()) {
      return cloneDeep(data);
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
      data: cloneDeep(data),
      expireOn: expirationTimestamp,
    });

    this._keys.add(key);
  }

  public remove(key: string): void {
    this._transferState.remove(makeStateKey(key));
  }

  public hasKey(key: string): boolean {
    return this._transferState.hasKey(makeStateKey(key));
  }

  public get isEmpty(): boolean {
    return this._keys.size === 0;
  }

  public clear(): void {
    if (this.isEmpty) return;

    this._keys.forEach((key) => this.remove(key));
  }
}
