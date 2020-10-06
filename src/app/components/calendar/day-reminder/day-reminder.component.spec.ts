import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';
import * as moment from 'moment';

import { TimeHourMinutes } from 'src/app/classes/time-hour-minutes';
import { CityService } from 'src/app/services/city.service';
import { WeatherService } from 'src/app/services/weather.service';
import { CityServiceMock } from '../../../testing/mocks/city-service-mock';


import { DayReminderComponent } from './day-reminder.component';
import { Reminder } from 'src/app/classes/reminder';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('DayReminderComponent', () => {
  const ReminderStub = {
    city: {
      name: 'testCityReminder'
    },
    day: new Date(),
    time: new TimeHourMinutes(0, 0),
    color: 'testColor',
    text: 'testing Text',
    weather: 'testWeather',
  };
  let component: DayReminderComponent;
  let fixture: ComponentFixture<DayReminderComponent>;
  let dialogSpy: jasmine.Spy;
  let cityService: CityService;
  let weatherService: WeatherService;
  const initialState = { reminders: [] };

  const dialogRefSpyObj = jasmine.createSpyObj({
      afterClosed: of(ReminderStub), close: null
    });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        DayReminderComponent
      ],
      providers: [
        { provide: CityService, useClass: CityServiceMock },
        provideMockStore({ initialState }),
      ],
      imports: [
        MatDialogModule,
        MatSnackBarModule,
        HttpClientTestingModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(DayReminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.reminders = [];
    cityService = TestBed.get(CityService);
    weatherService = TestBed.get(WeatherService);
    (component as any).store = TestBed.inject(MockStore);
    (component as any).store.setState({ reminders: [new Reminder()] });
    spyOn((component as any).store, 'select').and.returnValue(of({ reminders: [new Reminder()]}));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open a new dialog', () => {
    dialogSpy = spyOn(TestBed.get(MatDialog), 'open').and.returnValue(dialogRefSpyObj);
    spyOn(cityService, 'getLatAndLon').and.returnValue(of({ coord: { lat: 30, long: 10 } }));
    component.openReminderDialog();
    expect(dialogSpy).toHaveBeenCalled();
    expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
  });

  it('should get longitud and latitud', async () => {
    dialogSpy = spyOn(TestBed.get(MatDialog), 'open').and.returnValue(dialogRefSpyObj);
    spyOn(cityService, 'getLatAndLon').and.returnValue(of({ coord: { lat: 30, long: 10 } }));
    component.openReminderDialog();
    expect(dialogSpy).toHaveBeenCalled();
    expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
    await dialogRefSpyObj.afterClosed()
      .toPromise()
      .then(() => {
        expect(cityService.getLatAndLon).toHaveBeenCalled();
      })
      .catch();
  });

  it('should call getWeatherAndUpdateArray when gets lat and long from a city', async () => {
    dialogSpy = spyOn(TestBed.get(MatDialog), 'open').and.returnValue(dialogRefSpyObj);
    spyOn(cityService, 'getLatAndLon').and.returnValue(of({ coord: { lat: 30, long: 10 } }));
    spyOn(component, 'getWeatherAndUpdateArray').and.stub();
    component.openReminderDialog();
    expect(dialogSpy).toHaveBeenCalled();
    expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
    await dialogRefSpyObj.afterClosed().subscribe( async () => {
      await cityService.getLatAndLon('test')
        .toPromise()
        .then(() => {
          expect(component.getWeatherAndUpdateArray).toHaveBeenCalled();
        })
        .catch();
    });
  });

  it('should checkForEditionOrPush the reminder list when getWeatherAndUpdateArray is called', async () => {
    spyOn(component, 'checkForEditionOrPush').and.stub();
    const generalReminder = ReminderStub;
    generalReminder.city = {name: 'testCity', lat: 30, lon: 10} as any;
    generalReminder.day = moment().date(0) as any;
    const newReminder = generalReminder;
    const oldReminder = generalReminder;
    oldReminder.city = {name: 'testCity', lat: 30, lon: 10} as any;
    newReminder.city = {name: 'testCity', lat: 30, lon: 10} as any;
    spyOn(weatherService, 'getOpenWAPI').and.returnValue(of({ daily: [{ weather: [{main: 'Rain'}]}]}));

    component.getWeatherAndUpdateArray(oldReminder as any, newReminder as any);

    await weatherService.getOpenWAPI(30, 10)
      .toPromise()
      .then(() => {
        expect(component.checkForEditionOrPush).toHaveBeenCalled();
      })
      .catch();
  });

  it('should checkForEditionOrPush update the reminders array when edit', async () => {
    const generalReminder = ReminderStub;
    generalReminder.city = {name: 'testCity', lat: 30, lon: 10} as any;
    generalReminder.day = moment().date(0) as any;
    const newReminder = generalReminder as any;
    const oldReminder = generalReminder as any;
    component.reminders = [oldReminder];

    newReminder.text = 'changed text';
    component.checkForEditionOrPush(oldReminder, newReminder);
    expect(component.reminders).toEqual([newReminder as Reminder]);
  });

  it('should checkForEditionOrPush push a new reminder to the reminders array when create', async () => {
    const generalReminder = ReminderStub;
    generalReminder.city = {name: 'testCity', lat: 30, lon: 10} as any;
    generalReminder.day = moment().date(0) as any;
    const newReminder = generalReminder as any;
    component.reminders = [];

    newReminder.text = 'changed text';
    component.checkForEditionOrPush(undefined, newReminder);
    expect(component.reminders).toEqual([newReminder as Reminder]);
  });

  it('should checkForEditionOrPush should throw error if text is too long', async () => {
    spyOn(component, 'openSnackBar').and.stub();
    const generalReminder = ReminderStub;
    generalReminder.city = {name: 'testCity', lat: 30, lon: 10} as any;
    generalReminder.day = moment().date(0) as any;
    generalReminder.text = '123456789ddfddtgscgghftujfgdsrfhfghgshfghfghsdfgcsdsf';
    const newReminder = generalReminder as any;
    component.reminders = [];
    component.checkForEditionOrPush(undefined, newReminder);
    expect(component.openSnackBar).toHaveBeenCalled();
  });
});
