import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Reminder } from 'src/app/classes/reminder';

@Component({
  selector: 'app-reminder-label',
  templateUrl: './reminder-label.component.html',
  styleUrls: ['./reminder-label.component.scss']
})
export class ReminderLabelComponent implements OnInit {
  @Input() reminder = new Reminder();
  @Output() removeReminder = new EventEmitter();
  @Output() editReminder = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  removeReminderAction() {
    this.removeReminder.emit();
  }

  editReminderAction() {
    this.editReminder.emit();
  }

}
