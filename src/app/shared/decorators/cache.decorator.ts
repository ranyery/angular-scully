import { HttpErrorResponse } from '@angular/common/http';
import { TransferState } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { CacheKeys } from '../constants/cache-keys.enum';
import { CacheService } from '../services/cache.service';

const transferState = new TransferState();
const cacheService = new CacheService(transferState);

export function Cache<T>(config?: {
  key?: CacheKeys;
  secondsToExpire?: number;
}) {
  return function (
    target: any,
    methodName: string,
    descriptor: PropertyDescriptor
  ) {
    const className = target.constructor.name;
    const originalMethod = descriptor.value as (
      ...args: unknown[]
    ) => Observable<T>;

    descriptor.value = function (...args: unknown[]): Observable<T> {
      const cacheKey =
        config?.key || `${className}.${methodName}(${stringifyArgs(args)})`;

      const cachedData = cacheService.get<T>(cacheKey);
      if (cachedData) return of(cachedData);

      const observable = originalMethod.apply(this, args);
      return observable.pipe(
        tap((response) => {
          cacheService.set(cacheKey, response, config?.secondsToExpire);
        }),
        catchError((_httpError: HttpErrorResponse) => {
          cacheService.remove(cacheKey);
          throw _httpError;
        })
      );
    };

    return descriptor;
  };
}

function stringifyArgs(args: unknown[] = []): string {
  return args
    .map((arg) => (typeof arg === 'object' ? JSON.stringify(arg) : arg))
    .join(',');
}
