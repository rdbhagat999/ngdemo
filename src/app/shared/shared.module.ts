import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightDirective } from './highlight.directive';
import { TooltipDirective } from './tooltip.directive';

@NgModule({
  declarations: [HighlightDirective, TooltipDirective],
  imports: [CommonModule],
  exports: [HighlightDirective, TooltipDirective],
})
export class SharedModule {}
