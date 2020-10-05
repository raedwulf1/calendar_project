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
  displayedMonth
  constructor() { }

  ngOnInit() {
    this.selectedMonth = moment().month();
    this.selectedYear = moment().year();
    this.daysInCalendar = this.calculateDaysforCalendar(this.momentDate);
  }

  calculateDaysforCalendar(momentData: moment.Moment): any[] {
    let result = [];
    const CELLS_IN_CALENDAR = 42;
    const initDay = momentData.day();
    // console.log(initDay);
    for (let i = 0 - initDay; i < CELLS_IN_CALENDAR - initDay; i++) {
      result.push(moment().date(momentData.date() + i));
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
    this.momentDate.year(this.selectedYear).month(this.selectedMonth);
    this.daysInCalendar = this.calculateDaysforCalendar(this.momentDate);
  }

  backwardMonth() {
    if (this.selectedMonth > 0){
      --this.selectedMonth;
    } else {
      this.selectedMonth = 11;
      --this.selectedYear;
    }
    this.momentDate.year(this.selectedYear).month(this.selectedMonth);
    this.daysInCalendar = this.calculateDaysforCalendar(this.momentDate);
  }
}
