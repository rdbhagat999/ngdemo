import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { ProductService } from './product.service';
import { IProduct } from './products/product';

const mockProduct_1 = {
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
const mockProduct_2 = {
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
const mockProducts = [{ ...mockProduct_1 }, { ...mockProduct_2 }];
const mockProducts$ = of([...mockProducts]);

class MockHttpClient {}

@Injectable()
class MockProductService extends ProductService {
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

fdescribe('ProductService', () => {
  let service: MockProductService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ProductService, useClass: MockProductService },
        { provide: HttpClient, useClass: MockHttpClient },
      ],
    });
    service = TestBed.inject(ProductService);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`should return products observable with IDs [${mockProduct_1.id}, ${mockProduct_2.id}]`, (done) => {
    const products$ = service.getProducts();

    products$.subscribe((products: IProduct[]) => {
      expect(products[0].title).toBe(mockProduct_1.title);
      expect(products[1].title).toBe(mockProduct_2.title);

      done();
    });
  });

  it(`should return product observable with ID [${mockProduct_2.id}]`, (done) => {
    const product$ = service.getProduct(mockProduct_2.id);

    product$.subscribe((product: IProduct) => {
      expect(product.id).toBe(mockProduct_2.id);

      done();
    });
  });

  it(`should not return product observable with ID [9]`, (done) => {
    const product$ = service.getProduct(9);

    product$.subscribe((product: IProduct) => {
      expect(product?.id).not.toBe(9);

      done();
    });
  });
});
