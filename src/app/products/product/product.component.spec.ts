import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DefaultPipe } from 'src/app/shared/default.pipe';
import { TooltipDirective } from 'src/app/shared/tooltip.directive';
import { mockProduct_1, mockProduct_2 } from 'src/app/test_utils';

import { ProductComponent } from './product.component';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductComponent, DefaultPipe, TooltipDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.product = mockProduct_1;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it(`should render description: ${mockProduct_2?.description}`, () => {
    component.product = mockProduct_2;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p.description')?.textContent).toContain(
      mockProduct_2.description
    );
  });
});
