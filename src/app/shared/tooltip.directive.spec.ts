import { Component, DebugElement, ElementRef, Renderer2 } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TooltipDirective } from './tooltip.directive';
@Component({
  selector: 'app-dummy',
  template: `<h1 appTooltip="hello world">Hello world!</h1>`,
  styles: [],
})
export class DummyComponent {}

export function mockElementFactory() {
  return new MockElementRef();
}
export class MockElementRef implements ElementRef {
  nativeElement = {};
}

describe('TooltipDirective', () => {
  let directive: TooltipDirective;
  let fixture: ComponentFixture<DummyComponent>;
  let debugEls: DebugElement[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TooltipDirective, DummyComponent],
      providers: [
        TooltipDirective,
        Renderer2,
        { provide: ElementRef, useFactory: mockElementFactory },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DummyComponent);
    directive = TestBed.inject(TooltipDirective);
    debugEls = fixture.debugElement.queryAll(By.directive(TooltipDirective));
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should have one element with directive', () => {
    expect(debugEls.length).withContext('length').toBe(1);
  });
});
