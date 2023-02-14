import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthService } from './services/auth.service';
import { IDummyJsonUser } from './dummy-json-user.interface';
import { ProductService } from './services/product.service';
import { IProduct } from './products/product';

export const mockUser: IDummyJsonUser = {
  email: 'mockuser@email',
  firstName: 'mockuser_firstname',
  gender: 'mockuser_gender',
  id: 6,
  image: 'mockuser_image',
  lastName: 'mockuser_lastname',
  token: 'mockuser_token',
  username: 'kminchelle',
};
export const mockProduct_1 = {
  id: 1,
  title: 'product_name_1',
  description: 'product_description_1',
  price: 300,
  discountPercentage: 10,
  rating: 4,
  stock: 30,
  brand: 'product_brand_1',
  category: 'product_cat_1',
  thumbnail: 'product_thumbnail_1',
  images: ['product_image_1', 'product_image_2'],
};
export const mockProduct_2 = {
  id: 2,
  title: 'product_name_2',
  description: 'product_description_2',
  price: 300,
  discountPercentage: 20,
  rating: 4,
  stock: 30,
  brand: 'product_brand_2',
  category: 'product_cat_2',
  thumbnail: 'product_thumbnail_2',
  images: ['product_image_2', 'product_image_2'],
};
export const mockProducts = [{ ...mockProduct_1 }, { ...mockProduct_2 }];
export const mockProducts$ = of([...mockProducts]);

export class MockHttpClient {}

@Injectable()
export class MockAuthService extends AuthService {
  override updateDummyJsonAuthState(user: IDummyJsonUser | null) {
    this.updateAuthUser(user);
  }

  override loginToDummyJson(username: string, password: string) {
    this.updateDummyJsonAuthState(mockUser as IDummyJsonUser);
    return of(mockUser);
  }

  override logoutFromDummyJson() {
    this.updateAuthUser(null);
  }
}

@Injectable()
export class MockProductService extends ProductService {
  override getProducts(): Observable<IProduct[]> {
    return mockProducts$;
  }

  override getProduct(productId: number): Observable<IProduct> {
    const found = [mockProduct_1, mockProduct_2].filter(
      (p) => p.id === productId
    )[0];
    return of(found);
  }
}
