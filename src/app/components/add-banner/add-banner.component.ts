import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { AdItem } from 'src/app/_models/ad-item';
import { AdHostDirective } from 'src/app/_shared/ad-host.directive';
import { IAdComponent } from './ad.component';

@Component({
  selector: 'app-add-banner',
  templateUrl: './add-banner.component.html',
  styleUrls: ['./add-banner.component.scss'],
})
export class AddBannerComponent implements OnInit, OnChanges, OnDestroy {
  @Input() adList: AdItem[] = [];
  currentAdIndex = -1;
  interval: number | undefined;

  @ViewChild(AdHostDirective, { static: true }) adHost!: AdHostDirective;

  ngOnInit(): void {
    this.getAds();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // loadComponent throws error if adList array is empty
    if ((changes['adList'].currentValue as AdItem[]).length) {
      this.loadComponent();
    }
  }

  loadComponent(): void {
    this.currentAdIndex = (this.currentAdIndex + 1) % this.adList.length;

    const adItem = this.adList[this.currentAdIndex];

    console.log('adItem', adItem);

    const viewContainerRef = this.adHost.viewContainerRef;

    viewContainerRef.clear();

    try {
      // createComponent throws error if adList array is empty
      const cmpRef = viewContainerRef.createComponent<IAdComponent>(
        adItem.component
      );
      cmpRef.instance.data = adItem.data;
    } catch (error) {
      console.log(error);
    }
  }

  getAds() {
    this.interval = window.setInterval(() => {
      this.loadComponent();
    }, 5_000);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
