import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  isScullyGenerated,
  isScullyRunning,
  TransferStateService,
} from '@scullyio/ng-lib';
import { catchError, Observable, of, retry, tap } from 'rxjs';

import { CacheKeys } from '../constants/cache-keys.enum';
import { CacheService } from './cache.service';

@Injectable({ providedIn: 'root' })
export class FetchAndCacheService {
  private readonly _cacheService = inject(CacheService);
  private readonly _scullyTransferStateService = inject(TransferStateService);

  public get<T>(
    key: CacheKeys,
    observable: Observable<T>,
    secondsToExpire?: number
  ): Observable<T> {
    // Pre-rendered context
    if (isScullyRunning() || isScullyGenerated()) {
      return this._scullyTransferStateService.useScullyTransferState(
        key,
        observable.pipe(retry({ count: 2, delay: 500 }))
      );
    }

    // SPA context
    const cacheHasKey = this._cacheService.hasKey(key);
    if (cacheHasKey) {
      const cache = this._cacheService.get<T>(key);
      if (cache) return of(cache);
    }

    return observable.pipe(
      tap((response) => this._cacheService.set(key, response, secondsToExpire)),
      catchError((_httpError: HttpErrorResponse) => {
        this._cacheService.remove(key);
        throw _httpError;
      })
    );
  }
}
