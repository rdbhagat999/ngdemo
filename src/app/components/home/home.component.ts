import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { AdItem } from 'src/app/classes/ad-item';
import { AdService } from 'src/app/services/ad.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  adList: AdItem[] = [];
  adService = inject(AdService);
  sub$!: Subscription;

  ngOnInit() {
    this.sub$ = this.adService.getAds().subscribe({
      next: (ads: AdItem[]) => {
        this.adList = ads;
      },
    });
  }

  ngOnDestroy() {
    if (this.sub$) {
      this.sub$.unsubscribe();
    }
  }
}
