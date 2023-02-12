import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HighlightDirective } from 'src/app/shared/highlight.directive';

import { ProductTitleComponent } from './product-title.component';

describe('ProductTitleComponent', () => {
  let component: ProductTitleComponent;
  let fixture: ComponentFixture<ProductTitleComponent>;
  let debugEls: DebugElement[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductTitleComponent, HighlightDirective],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductTitleComponent);
    component = fixture.componentInstance;
    debugEls = fixture.debugElement.queryAll(By.directive(HighlightDirective));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have bg yellow <h5>', fakeAsync(() => {
    const h5El = debugEls[0].nativeElement as HTMLHeadingElement;

    h5El.dispatchEvent(new Event('mouseenter'));

    tick();

    fixture.detectChanges();

    const bgColor = h5El.style.backgroundColor;

    expect(bgColor).toBe('yellow');
  }));
});
