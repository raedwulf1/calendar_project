import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  openWAPIUrl = `https://api.openweathermap.org/data/2.5/onecall?exclude=minutely,hourly&appid=${environment.APIKey}`;
  constructor(private http: HttpClient) { }

  getOpenWAPI(latitude: number, longitude: number): Observable<any> {
    const url = `${this.openWAPIUrl}&lat=${latitude}&lon=${longitude}`;
    return this.http.get(url);
  }
}
