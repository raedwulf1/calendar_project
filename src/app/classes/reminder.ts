import { City } from './city';
import { TimeHourMinutes } from './time-hour-minutes';

export class Reminder {
  city = new City();
  day = new Date();
  time = new TimeHourMinutes();
  color = '';
  text = '';
  weather = {};
  
  constructor() {
  }

  getDate() {
  }

}
