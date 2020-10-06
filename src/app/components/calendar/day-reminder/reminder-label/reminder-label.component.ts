import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Reminder } from 'src/app/classes/reminder';

@Component({
  selector: 'app-reminder-label',
  templateUrl: './reminder-label.component.html',
  styleUrls: ['./reminder-label.component.scss']
})
export class ReminderLabelComponent {
  @Input() reminder = new Reminder();
  @Output() removeReminder = new EventEmitter();
  @Output() editReminder = new EventEmitter();
  constructor(
  ) { }

  removeReminderAction(): void {
    this.removeReminder.emit();
  }

  editReminderAction(): void {
    this.editReminder.emit();
  }

  getClassBackground(): string {
    return this.reminder.color ? `background-${this.reminder.color.toLocaleLowerCase()}` : '';
  }
}
