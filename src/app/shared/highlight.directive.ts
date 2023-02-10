import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  @Input() appHighlight = '';
  @Input() defaultColor = '';

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  @HostListener('mouseenter') onMouseEnter(): void {
    console.log('mouseenter');
    this.highlight('black', this.appHighlight || this.defaultColor || 'yellow');
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    console.log('mouseleave');
    this.highlight('', '');
  }

  private highlight(color: string, bgcolor: string): void {
    console.log('highlight');
    this.renderer.setStyle(this.el.nativeElement, 'color', color);
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', bgcolor);
  }
}
