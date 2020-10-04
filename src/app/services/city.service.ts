import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  cityAPIURLAccW = 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=9GQ7OJoh3PH3t6COmSKH0rqjyhvJbxoJ';
  cityAPIURLOpenW = 'http://api.openweathermap.org/data/2.5/weather?appid=5bb2d74e473c497ff44ddf10bf15e5c0';

  constructor(private http: HttpClient) { }

  getcityKey(searchString: string, options?: any): Observable<any> {
    const url = `${this.cityAPIURLAccW}&q=${searchString}`;
    return this.http.get(url, options);
  }

  getLatAndLon(searchString: string): Observable<any> {
    const url = `${this.cityAPIURLOpenW}&q=${searchString}`;
    return this.http.get(url);
  }

}
