import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LifeHooksComponent } from './life-hooks.component';
import { LifeHooksRoutingModule } from './life-hooks-routing.module';

@NgModule({
  declarations: [LifeHooksComponent],
  imports: [CommonModule, LifeHooksRoutingModule],
  exports: [LifeHooksRoutingModule],
})
export class LifeHooksModule {}
