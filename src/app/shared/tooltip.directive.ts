import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  Input,
  NgZone,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appTooltip]',
})
export class TooltipDirective {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  private zone = inject(NgZone);

  @Input() tooltip!: string;
  private delay = 100;
  private myPopup!: HTMLDivElement;
  private timer!: ReturnType<typeof setTimeout>;

  private createTooltipPopup(x: number, y: number) {
    let popup: HTMLDivElement = this.renderer.createElement('div');
    popup.innerHTML = this.tooltip;
    popup.setAttribute('class', 'tooltip-container');
    popup.style.top = y.toString() + 'px';
    popup.style.left = x.toString() + 'px';
    popup.style.fontSize = '1rem';
    popup.style.maxWidth = '300px';
    this.renderer.appendChild(this.el.nativeElement, popup);

    this.myPopup = popup;
    // setTimeout(() => {
    //   if (this.myPopup) {
    //     this.myPopup.remove();
    //   }
    // }, 5000); // Remove tooltip after 5 seconds
  }

  @HostListener('mouseenter')
  handleMouseEnterEvent(): void {
    this.zone.runOutsideAngular(() => {
      this.timer = setTimeout(() => {
        let x =
          this.el.nativeElement.getBoundingClientRect().left +
          this.el.nativeElement.offsetWidth / 2; // Get the middle of the element
        let y =
          this.el.nativeElement.getBoundingClientRect().top +
          this.el.nativeElement.offsetHeight +
          6; // Get the bottom of the element, plus a little extra
        this.createTooltipPopup(x, y);
      }, this.delay);
    });
  }

  @HostListener('mouseleave')
  handleMouseLeaveEvent(): void {
    this.zone.runOutsideAngular(() => {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      if (this.myPopup) {
        this.myPopup?.remove();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    if (this.myPopup) {
      this.myPopup?.remove();
    }
  }
}
