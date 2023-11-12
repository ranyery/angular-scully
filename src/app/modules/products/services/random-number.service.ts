import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Cache } from 'src/app/shared/decorators/cache.decorator';

@Injectable({
  providedIn: 'root',
})
export class RandomNumberService {
  private readonly _baseUrl = 'http://localhost:3000/random-number';

  constructor(private _httpClient: HttpClient) {}

  @Cache({ secondsToExpire: 30 })
  public getRandom(): Observable<number> {
    return this._httpClient
      .get<number[]>(this._baseUrl)
      .pipe(map((response) => response[0]));
  }
}
