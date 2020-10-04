export class TimeHourMinutes {
  hour: number;
  minutes: number;
  constructor(hour: number = 0, minutes: number = 0) {
    this.hour = hour;
    this.minutes = minutes;
  }

  getStringTime() {
    return `${this.getStringHour()}:${this.getStringMinutes()}`;
  }

  getStringHour(){
    const hour = this.hour ?
      this.hour < 10 ? `0${this.hour}` : `${this.hour}` :
      '00';
    return hour;
  }

  getStringMinutes(){
    const minutes = this.minutes ?
      this.minutes < 10 ? `0${this.minutes}` : `${this.minutes}` :
      '00';
    return minutes;
  }
}
