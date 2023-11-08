import { inject, Injectable } from '@angular/core';
import {
  isScullyGenerated,
  isScullyRunning,
  TransferStateService,
} from '@scullyio/ng-lib';
import { Observable, of, retry, tap } from 'rxjs';

import { CacheService } from './cache.service';

@Injectable({ providedIn: 'root' })
export class FetchAndCacheService {
  private readonly _cacheService = inject(CacheService);
  private readonly _scullyTransferStateService = inject(TransferStateService);

  private readonly _retryConfig = { count: 2, delay: 200 };

  public get<T>(
    key: string,
    observable: Observable<T>,
    secondsToExpire?: number
  ): Observable<T> {
    // Pre-rendered context
    if (isScullyRunning() || isScullyGenerated()) {
      return this._scullyTransferStateService.useScullyTransferState(
        key,
        observable.pipe(retry(this._retryConfig))
      );
    }

    // SPA context
    const cacheHasKey = this._cacheService.hasKey(key);
    if (cacheHasKey) {
      const cache = this._cacheService.get<T>(key);
      if (cache) return of(cache);
    }

    return observable.pipe(
      retry(this._retryConfig),
      tap((response) => {
        this._cacheService.set(key, response, secondsToExpire);
      })
    );
  }
}
