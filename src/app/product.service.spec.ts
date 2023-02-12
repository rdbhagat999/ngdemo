import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ProductService } from './product.service';
import { IProduct } from './products/product';
import {
  MockHttpClient,
  mockProducts$,
  MockProductService,
  mockProduct_1,
  mockProduct_2,
} from './test_utils';

describe('ProductService', () => {
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

  it(`should return products observable`, (done) => {
    spyOn(service, 'getProducts').and.returnValue(mockProducts$);

    const products$ = service.getProducts();

    expect(service.getProducts).toHaveBeenCalled();

    products$.subscribe((products: IProduct[]) => {
      expect(products[0].title).toBe(mockProduct_1.title);
      expect(products[1].title).toBe(mockProduct_2.title);

      done();
    });
  });

  it(`should return product observable with ID [${mockProduct_2.id}]`, (done) => {
    spyOn(service, 'getProduct').and.returnValue(of(mockProduct_2));

    const product$ = service.getProduct(mockProduct_2.id);

    expect(service.getProduct).toHaveBeenCalledWith(mockProduct_2.id);

    product$.subscribe((product: IProduct) => {
      expect(product.id).toBe(mockProduct_2.id);

      done();
    });
  });

  it(`should not return product observable with ID [9]`, (done) => {
    spyOn(service, 'getProduct').and.returnValue(of({} as IProduct));

    const product$ = service.getProduct(9);

    expect(service.getProduct).toHaveBeenCalledWith(9);

    product$.subscribe((product: IProduct) => {
      expect(product?.id).not.toBe(9);

      done();
    });
  });
});
