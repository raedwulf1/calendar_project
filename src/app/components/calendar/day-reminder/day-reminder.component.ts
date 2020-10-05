import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Reminder } from 'src/app/classes/reminder';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { DialogReminderComponent } from '../dialog-reminder/dialog-reminder.component';
import { CityService } from 'src/app/services/city.service';
import { WeatherService } from 'src/app/services/weather.service';
import { SubSink } from 'subsink';
import { AppState } from 'src/app/store/reminders.reducer';
import * as RemindersActions from '../../../store/reminder.actions';
import { Moment } from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-day-reminder',
  templateUrl: './day-reminder.component.html',
  styleUrls: ['./day-reminder.component.scss']
})
export class DayReminderComponent implements OnInit, OnDestroy {
  @Input() selectedDay: Date | Moment;
  @Input() reminders: Reminder[] = [];
  subs = new SubSink();

  constructor(
    public dialog: MatDialog,
    private cityService: CityService,
    private weatherService: WeatherService,
    private store: Store<AppState>,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.subs.sink = this.store.select('remindersArray').subscribe(reminderState => {
      if (!!reminderState){
        this.reminders = reminderState.reminders.filter((value) => {
          return this.isSameMoment(this.selectedDay as Moment, value.day);
        });
      }
      this.sortReminders();
    });
  }

  openReminderDialog(reminder?: Reminder): void {
    const editableReminder = reminder;
    const reminderData = reminder ? {...reminder} : {day: ''};
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
      this.store.dispatch(new RemindersActions.DeleteReminder(reminder));
    }
  }

  removeAllReminders() {
    this.store.dispatch(new RemindersActions.DeleteReminders(this.reminders));
    this.reminders = [];
  }

  checkForEditionOrPush(oldReminder: Reminder, newReminder: Reminder): void{
    if (newReminder.text.length > 30){
      this.openSnackBar('Reminder text too long', 'Error');
    }
    if (!!oldReminder && !!newReminder){
      const index = this.reminders.indexOf(oldReminder);
      if (index > -1) {
        this.reminders.splice(index, 1, newReminder);
        this.store.dispatch(new RemindersActions.UpdateReminder({oldReminder, newReminder}));
      }
    } else if (!!newReminder){
        this.reminders.push(newReminder);
        this.store.dispatch(new RemindersActions.AddReminder(newReminder));
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
              return this.isSameDate(date, reminder.day);
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

  isSameDate(firstDate: Date, secondDate: Moment): boolean {
    return  firstDate.getDate() === secondDate.date()
            && firstDate.getMonth() === secondDate.month()
            && firstDate.getFullYear() === secondDate.year();
  }

  isSameMoment(firstDate: Moment, secondDate: Moment): boolean {
    return  firstDate.date() === secondDate.date()
            && firstDate.month() === secondDate.month()
            && firstDate.year() === secondDate.year();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
