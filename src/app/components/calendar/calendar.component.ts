import { Component, Input } from '@angular/core';
import * as moment from 'moment';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {

  @Input() daysInCalendar = [];
  @Input() selectedMonth: number;
  today = moment();
  constructor(
  ) { }

  isToday(day: moment.Moment): boolean {
    return  day.date() === this.today.date()
    && day.month() === this.today.month()
    && day.year() === this.today.year();
  }

  isOldDate(day: moment.Moment): boolean {
    if (day.year() < this.today.year()
    || day.month() < this.today.month()){
      return true;
    } else if (day.year() === this.today.year()
    && day.month() === this.today.month() ){
      return day.date() < this.today.date();
    }

    return false;
  }
}
