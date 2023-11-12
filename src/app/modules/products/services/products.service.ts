import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CacheKeys } from 'src/app/shared/constants/cache-keys.enum';
import { FetchAndCacheService } from 'src/app/shared/services/fetch-and-cache.service';

import { IProduct } from '../components/product-card/product-card.component';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly _baseUrl = 'http://localhost:3000/products';

  constructor(
    private _httpClient: HttpClient,
    private _fetchAndCacheService: FetchAndCacheService
  ) {}

  public getAll(): Observable<IProduct[]> {
    const observable = this._httpClient.get<IProduct[]>(this._baseUrl);
    return this._fetchAndCacheService.get(CacheKeys.PRODUCTS, observable);
  }
}
