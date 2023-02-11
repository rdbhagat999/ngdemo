import { Observable, of } from 'rxjs';

interface IProduct {
  id: number;
  name: string;
  brand: string;
}
const mockProduct_1 = {
  id: 1,
  name: 'mock_product_name',
  brand: 'mock_product_brand',
};
const mockProduct_2 = {
  id: 2,
  name: 'mock_product_name',
  brand: 'mock_product_brand',
};
const mockProducts = [{ ...mockProduct_1 }, { ...mockProduct_2 }];
const mockProducts$ = of([...mockProducts]);

class MockProductService {
  getProducts(): Observable<IProduct[]> {
    return mockProducts$;
  }

  getProduct(productId: number): Observable<IProduct> {
    const found = [mockProduct_1, mockProduct_2].filter(
      (p) => p.id === productId
    )[0];
    return of(found);
  }
}

fdescribe('ProductService', () => {
  let service: MockProductService;

  beforeEach(() => {
    service = new MockProductService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`should return products observable with IDs [${mockProduct_1.id}, ${mockProduct_2.id}]`, (done) => {
    const products$ = service.getProducts();

    products$.subscribe((products: IProduct[]) => {
      expect(products[0].name).toBe(mockProduct_1.name);
      expect(products[1].name).toBe(mockProduct_2.name);

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
