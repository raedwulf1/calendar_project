import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { City } from 'src/app/classes/city';
import { Reminder } from 'src/app/classes/reminder';
import { TimeHourMinutes } from 'src/app/classes/time-hour-minutes';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-dialog-reminder',
  templateUrl: './dialog-reminder.component.html',
  styleUrls: ['./dialog-reminder.component.scss']
})
export class DialogReminderComponent implements OnInit, OnDestroy {

  time: string;
  colorOptions = ['Blue', 'Red', 'Green', 'Pink', 'Violet', 'Wheat'];
  cityString = '';
  selectedCity: City;
  locationsFiltered: City[] = [];
  subs = new SubSink();

  constructor(
    public dialogRef: MatDialogRef<DialogReminderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Reminder
    ) {}

  ngOnInit(): void {
    this.cityString = this.data.city ? this.data.city.name : '';
    this.time = this.data.time ? this.data.time.getStringTime() : '00:00';
  }

  cancelDialog(): void {
    this.dialogRef.close();
  }

  saveDialog(): void {
    if ((!!this.selectedCity || !!this.cityString) && !!this.data.text && !!this.time) {
      this.data.time = new TimeHourMinutes(Number(this.time.split(':')[0]), Number(this.time.split(':')[1]));
      this.data.city = this.selectedCity || {name: this.cityString};
      this.dialogRef.close(this.data);
    }
  }

  ngOnDestroy(): void {
    if (!!this.subs) {
      this.subs.unsubscribe();
    }
  }
}
