import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SkipPrerenderingDirective } from 'src/app/shared/directives/skip-prerendering.directive';

import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductsPage } from './page/products.page';
import { ProductsRoutingModule } from './products-routing.module';

@NgModule({
  declarations: [ProductsPage, ProductCardComponent],
  imports: [CommonModule, ProductsRoutingModule, SkipPrerenderingDirective],
})
export class ProductsModule {}
