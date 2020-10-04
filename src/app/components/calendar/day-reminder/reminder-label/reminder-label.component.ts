import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Reminder } from 'src/app/classes/reminder';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-reminder-label',
  templateUrl: './reminder-label.component.html',
  styleUrls: ['./reminder-label.component.scss']
})
export class ReminderLabelComponent implements OnInit, OnChanges {
  @Input() reminder = new Reminder();
  @Output() removeReminder = new EventEmitter();
  @Output() editReminder = new EventEmitter();
  constructor(
    private weatherService: WeatherService
  ) { }

  ngOnInit() {
    // this.getWeather();
  }

  ngOnChanges() {
    // this.getWeather();
  }

  removeReminderAction() {
    this.removeReminder.emit();
  }

  editReminderAction() {
    this.editReminder.emit();
  }

  getClassBackground() {
    return this.reminder.color ? `background-${this.reminder.color.toLocaleLowerCase()}` : '';
  }

}
