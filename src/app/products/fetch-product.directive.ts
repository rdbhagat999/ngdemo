import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  NgZone,
} from '@angular/core';
import { IProduct } from './product';

@Directive({
  selector: '[appFetchProduct]',
})
export class FetchProductDirective implements OnDestroy {
  @Input() appFetchProduct!: IProduct;
  private delay = 100;
  private myPopup!: HTMLDivElement;
  private timer!: ReturnType<typeof setTimeout>;

  constructor(private el: ElementRef, private zone: NgZone) {}

  private createTooltipPopup(x: number, y: number) {
    let popup = document.createElement('div');
    popup.innerHTML = `${this.appFetchProduct.description.toString()}`;
    popup.setAttribute('class', 'tooltip-container');
    popup.style.top = y.toString() + 'px';
    popup.style.left = x.toString() + 'px';
    popup.style.fontSize = '1rem';
    popup.style.maxWidth = '300px';
    document.body.appendChild(popup);
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
