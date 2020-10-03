import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Reminder } from 'src/app/classes/reminder';
import { DialogReminderComponent } from '../dialog-reminder/dialog-reminder.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-day-reminder',
  templateUrl: './day-reminder.component.html',
  styleUrls: ['./day-reminder.component.scss']
})
export class DayReminderComponent implements OnInit {

  reminders: Reminder[] = [];

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  openReminderDialog(reminder?: Reminder) {
    const dialogRef = this.dialog.open(DialogReminderComponent, {
      width: '250px',
      data: {}
      //  {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

}
