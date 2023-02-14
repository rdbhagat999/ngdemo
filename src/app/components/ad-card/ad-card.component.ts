import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ad-card',
  templateUrl: './ad-card.component.html',
  styleUrls: ['./ad-card.component.scss'],
})
export class AdCardComponent {
  @Input() data: any;
}
