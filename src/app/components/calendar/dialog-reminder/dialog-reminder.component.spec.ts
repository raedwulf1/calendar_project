import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Reminder } from 'src/app/classes/reminder';
import { TimeHourMinutes } from 'src/app/classes/time-hour-minutes';
import { ReminderMock } from 'src/app/testing/mocks/reminder-mock';


import { DialogReminderComponent } from './dialog-reminder.component';

describe('DialogReminderComponent', () => {
  let component: DialogReminderComponent;
  let fixture: ComponentFixture<DialogReminderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        DialogReminderComponent
       ],
      providers: [
        { provide: MatDialogRef, useValue: {
          close(value){}
        } },
        {
          provide: MAT_DIALOG_DATA, useValue: [{ titile: 'test' }]
        },
      ],
      imports: [
        HttpClientTestingModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(DialogReminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog with a new reminder', () => {
    component.data = {...new ReminderMock()} as Reminder;
    component.cityString = 'testCityReminder';
    spyOn(component.dialogRef, 'close').and.stub();

    component.saveDialog();

    expect(component.dialogRef.close).toHaveBeenCalledWith({
      city: {
        name: 'testCityReminder'
      },
      day: 'testDate',
      time: new TimeHourMinutes(0, 0),
      color: 'testColor',
      text: 'testing Text',
      weather: 'testWeather',
    });
  });
});
