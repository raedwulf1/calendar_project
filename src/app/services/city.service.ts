import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  cityAPIURLOpenW = `http://api.openweathermap.org/data/2.5/weather?appid=${environment.APIKey}`;

  constructor(private http: HttpClient) { }

  getLatAndLon(searchString: string): Observable<any> {
    const url = `${this.cityAPIURLOpenW}&q=${searchString}`;
    return this.http.get(url);
  }

}
