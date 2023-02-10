import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product/product.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductPageComponent } from './product-page/product-page.component';
import { ProductTitleComponent } from './product-title/product-title.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ProductComponent,
    ProductListComponent,
    ProductPageComponent,
    ProductTitleComponent,
  ],
  imports: [CommonModule, SharedModule, ProductsRoutingModule],
})
export class ProductsModule {}
