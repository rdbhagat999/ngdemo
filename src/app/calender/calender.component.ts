import { Component, ViewChild } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FullCalendarComponent } from '@fullcalendar/angular';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss'],
})
export class CalenderComponent {
  @ViewChild('calendar') calendarCmp!: FullCalendarComponent;

  events: any[] = [
    { title: 'event 1', date: '2019-04-01' },
    { title: 'event 2', date: '2019-04-02' },
  ];

  calendarOptions: CalendarOptions = {
    headerToolbar: {
      right: 'prev,next today',
      center: 'title',
      left: 'dayGridMonth',
    },
    plugins: [interactionPlugin, dayGridPlugin],
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this), // MUST ensure `this` context is maintained
    events: [...this.events],
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
  };

  handleDateClick(arg: any) {
    alert('Clicked on date : ' + arg.dateStr);
  }

  toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends; // toggle the boolean!
  }

  nextMonth() {
    let calendarApi = this.calendarCmp.getApi();
    calendarApi.next();
  }
}
