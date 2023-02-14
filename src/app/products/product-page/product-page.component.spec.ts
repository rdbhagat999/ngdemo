import { HttpClient } from '@angular/common/http';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ProductService } from 'src/app/services/product.service';
import { DefaultPipe } from 'src/app/shared/default.pipe';
import { TooltipDirective } from 'src/app/shared/tooltip.directive';
import {
  MockHttpClient,
  mockProducts$,
  MockProductService,
  mockProduct_1,
  mockProduct_2,
} from 'src/app/test_utils';
import { IProduct } from '../product';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductTitleComponent } from '../product-title/product-title.component';
import { ProductComponent } from '../product/product.component';

import { ProductPageComponent } from './product-page.component';

describe('ProductPageComponent', () => {
  let component: ProductPageComponent;
  let fixture: ComponentFixture<ProductPageComponent>;
  let http: HttpClient;
  let service: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ProductPageComponent,
        ProductListComponent,
        ProductComponent,
        ProductTitleComponent,
        DefaultPipe,
        TooltipDirective,
      ],
      providers: [
        { provide: ProductService, useClass: MockProductService },
        { provide: HttpClient, useClass: MockHttpClient },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductPageComponent);
    component = fixture.componentInstance;
    http = TestBed.inject(HttpClient);
    service = TestBed.inject(ProductService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have called ngOnInit', () => {
    spyOn(component, 'ngOnInit');

    component.ngOnInit();

    expect(component.ngOnInit).toHaveBeenCalled();
  });

  it('should render title', fakeAsync(() => {
    // fakeAsync + tick [don't handle or track  http requests]
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    tick();
    expect(compiled.querySelector('h1')?.textContent).toContain('Product List');
  }));

  it('should return observable of products', (done) => {
    spyOn(service, 'getProducts').and.returnValue(mockProducts$);

    const products$ = service.getProducts();

    expect(service.getProducts).toHaveBeenCalled();

    products$.subscribe((products: IProduct[]) => {
      expect(products[0].title).toBe(mockProduct_1.title);
      expect(products[1].title).toBe(mockProduct_2.title);

      done();
    });
  });
});
