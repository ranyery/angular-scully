import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FetchAndCacheService } from 'src/app/shared/services/fetch-and-cache.service';

import { IProduct } from '../components/product-card/product-card.component';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly _baseUrl = 'http://localhost:3000/products';
  private readonly _fetchAndCacheService = inject(FetchAndCacheService);

  constructor(private _httpClient: HttpClient) {}

  public getAll(): Observable<IProduct[]> {
    return this._fetchAndCacheService.get(
      'products',
      this._httpClient.get<IProduct[]>(this._baseUrl)
    );
  }
}
