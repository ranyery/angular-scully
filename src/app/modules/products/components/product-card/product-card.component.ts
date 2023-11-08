import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

export interface IProduct {
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductCardComponent implements OnInit {
  @Input() product?: IProduct;

  constructor() {}

  ngOnInit(): void {}
}
