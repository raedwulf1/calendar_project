import { City } from 'src/app/classes/city';
import { TimeHourMinutes } from 'src/app/classes/time-hour-minutes';
import * as moment from 'moment';

export class ReminderMock {
  city = {
    name: 'testCity'
  };
  day = 'testDate';
  time = new TimeHourMinutes();
  color = 'testColor';
  text = 'testing Text';
  weather = 'testWeather';
}
