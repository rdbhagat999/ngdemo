import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightDirective } from './highlight.directive';
import { TooltipDirective } from './tooltip.directive';
import { DefaultPipe } from './default.pipe';
import { AdHostDirective } from './ad-host.directive';

@NgModule({
  declarations: [
    HighlightDirective,
    TooltipDirective,
    DefaultPipe,
    AdHostDirective,
  ],
  imports: [CommonModule],
  providers: [],
  exports: [HighlightDirective, TooltipDirective, DefaultPipe, AdHostDirective],
})
export class SharedModule {}
