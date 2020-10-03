import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Reminder } from 'src/app/classes/reminder';

@Component({
  selector: 'app-dialog-reminder',
  templateUrl: './dialog-reminder.component.html',
  styleUrls: ['./dialog-reminder.component.scss']
})
export class DialogReminderComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogReminderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Reminder) {}

  cancelDialog(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
