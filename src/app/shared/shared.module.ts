import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightDirective } from './highlight.directive';
import { TooltipDirective } from './tooltip.directive';
import { DefaultPipe } from './default.pipe';

@NgModule({
  declarations: [HighlightDirective, TooltipDirective, DefaultPipe],
  imports: [CommonModule],
  providers: [],
  exports: [HighlightDirective, TooltipDirective, DefaultPipe],
})
export class SharedModule {}
