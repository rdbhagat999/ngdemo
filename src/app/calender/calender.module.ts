import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FullCalendarModule } from '@fullcalendar/angular';
import { CalenderComponent } from './calender.component';
import { CalenderRoutingModule } from './calender-routing.module';

@NgModule({
  declarations: [CalenderComponent],
  imports: [CommonModule, FullCalendarModule, CalenderRoutingModule],
  exports: [CalenderRoutingModule],
})
export class CalenderModule {}
