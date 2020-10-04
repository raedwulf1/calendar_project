import { Component, Input, OnInit } from '@angular/core';
import { Reminder } from 'src/app/classes/reminder';
import { DialogReminderComponent } from '../dialog-reminder/dialog-reminder.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-day-reminder',
  templateUrl: './day-reminder.component.html',
  styleUrls: ['./day-reminder.component.scss']
})
export class DayReminderComponent implements OnInit {
  @Input() selectedDay: Date;
  @Input() reminders: Reminder[] = [];

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  openReminderDialog(reminder?: Reminder): void {
    const editableReminder = reminder;
    const reminderData = reminder ? reminder : {day: ''};
    reminderData.day = this.selectedDay;
    const dialogRef = this.dialog.open(DialogReminderComponent, {
      width: '250px',
      data: reminderData
    });

    dialogRef.afterClosed().subscribe((result: Reminder) => {
      if (!!result){
        this.checkForEditionOrPush(editableReminder, result);
        this.sortReminders();
      }
    });
  }

  removeReminder(reminder: Reminder) {
    const index = this.reminders.indexOf(reminder);
    if (index > -1) {
      this.reminders.splice(index, 1);
    }
  }

  checkForEditionOrPush(oldReminder: Reminder, newReminder: Reminder): void{
    if (!!oldReminder && !!newReminder){
      const index = this.reminders.indexOf(oldReminder);
      if (index > -1) {
        this.reminders.splice(index, 1, newReminder);
      }
    } else if (!!newReminder){
        this.reminders.push(newReminder);
    }

  }

  sortReminders(): void {
    this.reminders.sort((a, b) => {
      if (a.time.hour === b.time.hour){
        return a.time.minutes - b.time.hour;
      } else {
        return a.time.hour - b.time.hour;
      }
    });
  }
}
