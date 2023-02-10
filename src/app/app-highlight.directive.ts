import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective implements OnInit, AfterViewInit {
  @Input() appHighlight = '';
  @Input() defaultColor = '';

  constructor(private el: ElementRef<HTMLParagraphElement>) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  @HostListener('mouseenter') onMouseEnter(): void {
    this.highlight(this.appHighlight || this.defaultColor || 'yellow');
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.highlight('');
  }

  private highlight(color: string): void {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
