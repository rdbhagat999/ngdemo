import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IProduct } from './products/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);

  getProducts(): Observable<IProduct[]> {
    return this.http
      .get(`https://dummyjson.com/auth/products?limit=10`, {
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem('token')}`,
        //   'Content-Type': 'application/json',
        // },
      })
      .pipe(map((data: any) => data?.products as IProduct[]));
  }

  getProduct(productId: number): Observable<IProduct> {
    return this.http.get<IProduct>(
      `https://dummyjson.com/auth/products/${productId}`,
      {
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem('token')}`,
        //   'Content-Type': 'application/json',
        // },
      }
    );
  }
}
