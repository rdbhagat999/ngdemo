import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product/product.component';
import { ProductsRoutingModule } from './products-routing.module';
import { FetchProductDirective } from './fetch-product.directive';
import { ProductPageComponent } from './product-page/product-page.component';
import { ProductTitleComponent } from './product-title/product-title.component';

@NgModule({
  declarations: [ProductComponent, ProductListComponent, FetchProductDirective, ProductPageComponent, ProductTitleComponent],
  imports: [CommonModule, ProductsRoutingModule],
})
export class ProductsModule {}
