import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Reminder } from 'src/app/classes/reminder';
import { DialogReminderComponent } from '../dialog-reminder/dialog-reminder.component';
import { MatDialog } from '@angular/material/dialog';
import { CityService } from 'src/app/services/city.service';
import { WeatherService } from 'src/app/services/weather.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-day-reminder',
  templateUrl: './day-reminder.component.html',
  styleUrls: ['./day-reminder.component.scss']
})
export class DayReminderComponent implements OnInit,OnDestroy {
  @Input() selectedDay: Date;
  @Input() reminders: Reminder[] = [];
  subs = new SubSink();

  constructor(
    public dialog: MatDialog,
    private cityService: CityService,
    private weatherService: WeatherService
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

    this.subs.sink = dialogRef.afterClosed().subscribe( (result: Reminder) => {
      if (!!result){
        this.subs.sink = this.cityService.getLatAndLon(result.city.name).subscribe((value) => {
          if (value) {
            result.city.lat = value.coord.lat;
            result.city.lon = value.coord.lon;
            this.getWeatherAndUpdateArray(editableReminder, result);
          } else {
            this.checkForEditionOrPush(editableReminder, result);
            this.sortReminders();
          }
        }, (err) => {
          console.log(err);
          this.checkForEditionOrPush(editableReminder, result);
          this.sortReminders();
        }
        );
      }
    });
  }

  removeReminder(reminder: Reminder) {
    const index = this.reminders.indexOf(reminder);
    if (index > -1) {
      this.reminders.splice(index, 1);
    }
  }

  removeAllReminders() {
    this.reminders = [];
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

  getWeatherAndUpdateArray(editableReminder: Reminder, reminder: Reminder) {
    if (!!reminder && !!reminder.city.lat && !!reminder.city.lon) {
      this.subs.sink = this.weatherService.getOpenWAPI(reminder.city.lat, reminder.city.lon)
        .subscribe((value) => {
          if (!!value.daily && value.daily.length > 0) {
            const timeIndex = value.daily.findIndex((day) => {
              const date = new Date(day.dt * 1000);
              const isSameDate = date.getDate() === reminder.day.date()
                && date.getMonth() === reminder.day.month()
                && date.getFullYear() === reminder.day.year();
              return isSameDate;
            });
            if (timeIndex > -1) {
              reminder.weather = value.daily[timeIndex].weather[0].main;
            }
          }
          this.checkForEditionOrPush(editableReminder, reminder);
          this.sortReminders();
        });
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
