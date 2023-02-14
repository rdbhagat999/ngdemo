import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AdItem } from '../classes/ad-item';
import { AdCardComponent } from '../components/ad-card/ad-card.component';
import { IProduct } from '../products/product';

@Injectable({
  providedIn: 'root',
})
export class AdService {
  private http = inject(HttpClient);

  constructor() {}

  getAds() {
    return this.http
      .get(`https://dummyjson.com/products?limit=5`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .pipe(
        map((data: any) => data?.products as IProduct[]),
        map((products: IProduct[]) =>
          products.map((product) => new AdItem(AdCardComponent, product))
        )
      );
  }
}
