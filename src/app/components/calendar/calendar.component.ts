import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnChanges {

  @Input() daysInCalendar = [];
  @Input() selectedMonth: number;

  constructor(
  ) { }

  ngOnInit() {
  }

  ngOnChanges(change) {
    // console.log(new Date(this.daysInCalendar[0].valueOf()));
    // console.log(this.selectedMonth);
  }

}
