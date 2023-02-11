import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/product.service';
import { IProduct } from '../product';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit {
  @ViewChild('heading') headingRef!: ElementRef;
  @ViewChild(ProductListComponent) productList!: ProductListComponent;

  private productService: ProductService = inject(ProductService);
  products$!: Observable<IProduct[]>;

  ngOnInit() {
    this.products$ = this.productService.getProducts();
  }
}
