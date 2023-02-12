import { Component, DebugElement, ElementRef, Renderer2 } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HighlightDirective } from './highlight.directive';

@Component({
  selector: 'app-dummy',
  template: `<h1 appHighlight>Hello world!</h1>
    <h2 appHighlight="red">Hello world!</h2>`,
})
export class DummyComponent {}

export function mockElementFactory() {
  return new MockElementRef();
}
export class MockElementRef implements ElementRef {
  nativeElement = {};
}

describe('HighlightDirective', () => {
  let directive: HighlightDirective;
  let fixture: ComponentFixture<DummyComponent>;
  let debugEls: DebugElement[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HighlightDirective, DummyComponent],
      providers: [
        HighlightDirective,
        Renderer2,
        { provide: ElementRef, useFactory: mockElementFactory },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DummyComponent);
    directive = TestBed.inject(HighlightDirective);
    debugEls = fixture.debugElement.queryAll(By.directive(HighlightDirective));
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should have two elements with directive', () => {
    expect(debugEls.length).withContext('length').toBe(2);
  });

  it('h1 should have yellow bgColor on mouseenter event', () => {
    const h1El = debugEls[0].nativeElement as HTMLHeadingElement;

    h1El.dispatchEvent(new Event('mouseenter'));

    fixture.detectChanges();

    expect(h1El.style.backgroundColor)
      .withContext('changed h1El backgroundColor')
      .toBe('yellow');
  });

  it('<h2> should have "red" bgColor on mouseenter event', () => {
    const h2El = debugEls[1].nativeElement as HTMLInputElement;

    h2El.dispatchEvent(new Event('mouseenter'));

    fixture.detectChanges();

    expect(h2El.style.backgroundColor)
      .withContext('changed backgroundColor')
      .toBe('red');
  });

  it('should color <h2> background "cyan" on mouseenter event', () => {
    const dir = debugEls[1].injector.get(
      HighlightDirective
    ) as HighlightDirective;

    dir.appHighlight = 'cyan';

    fixture.detectChanges();

    const h2El = debugEls[1].nativeElement as HTMLInputElement;

    h2El.dispatchEvent(new Event('mouseenter'));

    fixture.detectChanges();

    expect(h2El.style.backgroundColor)
      .withContext('changed backgroundColor')
      .toBe('cyan');
  });

  it('should remove bgcolor from <h2> on mouseleave event', () => {
    const h2El = debugEls[1].nativeElement as HTMLInputElement;

    h2El.dispatchEvent(new Event('mouseleave'));

    fixture.detectChanges();

    expect(h2El.style.backgroundColor)
      .withContext('changed backgroundColor')
      .toBe('');
  });
});
