import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  cityAPIURL = 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=9GQ7OJoh3PH3t6COmSKH0rqjyhvJbxoJ';

  constructor(private http: HttpClient) { }

  get(searchString: string, options?: any): Observable<any> {
    const url = `${this.cityAPIURL}&q=${searchString}`;
    return this.http.get(url, options);
  }

}
