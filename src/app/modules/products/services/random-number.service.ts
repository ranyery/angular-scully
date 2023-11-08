import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { FetchAndCacheService } from 'src/app/shared/services/fetch-and-cache.service';

@Injectable({
  providedIn: 'root',
})
export class RandomNumberService {
  private readonly _baseUrl = 'http://localhost:3000/random-number';
  private readonly _fetchAndCacheService = inject(FetchAndCacheService);

  constructor(private _httpClient: HttpClient) {}

  public getRandom(): Observable<number> {
    return this._fetchAndCacheService.get(
      'random-number',
      this._httpClient
        .get<number[]>(this._baseUrl)
        .pipe(map((response) => response[0])),
      60
    );
  }
}
