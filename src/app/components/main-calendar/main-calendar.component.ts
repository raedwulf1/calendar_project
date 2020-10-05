import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-main-calendar',
  templateUrl: './main-calendar.component.html',
  styleUrls: ['./main-calendar.component.scss']
})
export class MainCalendarComponent implements OnInit {
  daysInCalendar = [];
  selectedMonth = 0;
  selectedYear = 0;
  momentDate = moment().date(1);
  MONTHS = moment.months();
  displayedMonth = this.MONTHS[this.momentDate.month()];
  constructor() { }

  ngOnInit() {
    this.selectedMonth = moment().month();
    this.selectedYear = moment().year();
    this.daysInCalendar = this.calculateDaysforCalendar(this.momentDate);
  }

  calculateDaysforCalendar(momentData: moment.Moment): any[] {
    const result = [];
    const CELLS_IN_CALENDAR = 42;
    const initDay = momentData.day();
    for (let i = 0 - initDay; i < CELLS_IN_CALENDAR - initDay; i++) {
      result.push(moment().year(this.selectedYear).month(this.selectedMonth).date(momentData.date() + i));
    }

    return result;
  }

  forwardMonth() {
    if (this.selectedMonth < 11){
      ++this.selectedMonth;
    } else {
      this.selectedMonth = 0;
      ++this.selectedYear;
    }
    this.momentDate = this.momentDate.year(this.selectedYear).month(this.selectedMonth).date(1);
    this.daysInCalendar = this.calculateDaysforCalendar(this.momentDate);
    this.displayedMonth = this.MONTHS[this.momentDate.month()];
  }

  backwardMonth() {
    if (this.selectedMonth > 0){
      --this.selectedMonth;
    } else {
      this.selectedMonth = 11;
      --this.selectedYear;
    }
    this.momentDate = this.momentDate.year(this.selectedYear).month(this.selectedMonth).date(1);
    this.daysInCalendar = this.calculateDaysforCalendar(this.momentDate);
    this.displayedMonth = this.MONTHS[this.momentDate.month()];
  }
}
