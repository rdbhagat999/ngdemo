import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HighlightDirective } from './highlight.directive';
import { TooltipDirective } from './tooltip.directive';
import { DefaultPipe } from './default.pipe';
import { AdHostDirective } from './ad-host.directive';
import { InputFocusDirective } from './input-focus.directive';
import { CreditCardDirective } from './credit-card.directive';

@NgModule({
  declarations: [
    HighlightDirective,
    TooltipDirective,
    DefaultPipe,
    AdHostDirective,
    InputFocusDirective,
    CreditCardDirective,
  ],
  imports: [CommonModule],
  providers: [],
  exports: [
    HighlightDirective,
    TooltipDirective,
    DefaultPipe,
    AdHostDirective,
    InputFocusDirective,
  ],
})
export class SharedModule {}
