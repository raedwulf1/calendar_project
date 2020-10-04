import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  AccWAPIUrl = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/353020?apikey=9GQ7OJoh3PH3t6COmSKH0rqjyhvJbxoJ';
  openWAPIUrl = 'https://api.openweathermap.org/data/2.5/onecall?exclude=minutely,hourly&appid=5bb2d74e473c497ff44ddf10bf15e5c0';
  constructor(private http: HttpClient) { }

  getAccWAPI(options?: any): Observable<any> {
    return this.http.get(this.AccWAPIUrl, options);
  }

  getOpenWAPI(latitude: number, longitude: number): Observable<any> {
    const url = `${this.openWAPIUrl}&lat=${latitude}&lon=${longitude}`;
    return this.http.get(url);
  }
}
