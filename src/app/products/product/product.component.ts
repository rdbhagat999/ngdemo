import {
  AfterContentChecked,
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
} from '@angular/core';
import { IProduct } from '@app/products/product';
import { ProductTitleComponent } from '../product-title/product-title.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent implements AfterContentInit, AfterContentChecked {
  @Input() product!: IProduct;
  @ContentChild(ProductTitleComponent) productHeading!: ProductTitleComponent;

  ngAfterContentInit(): void {
    console.log('[ngAfterContentInit] productHeading', this.productHeading);
  }

  ngAfterContentChecked(): void {
    console.log('[AfterContentChecked] productHeading', this.productHeading);
  }
}
