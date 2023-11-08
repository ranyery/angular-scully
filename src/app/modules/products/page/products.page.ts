import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { IProduct } from '../components/product-card/product-card.component';
import { ProductsService } from '../services/products.service';
import { RandomNumberService } from '../services/random-number.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductsPage implements OnInit {
  public products: IProduct[] = [];
  public randomNumber: number = 0;

  constructor(
    private _productsService: ProductsService,
    private _randomNumberService: RandomNumberService
  ) {}

  ngOnInit(): void {
    this._productsService.getAll().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: () => {},
    });

    this._randomNumberService.getRandom().subscribe({
      next: (value) => {
        // this.randomNumber = Math.floor(Math.random() * value);
        this.randomNumber = value;
      },
      error: () => {},
    });
  }
}
