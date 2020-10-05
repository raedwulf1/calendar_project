import { Observable, of } from 'rxjs';

export class CityServiceMock {

  cityAPIURLAccW = '';
  cityAPIURLOpenW = '';


  getcityKey(searchString: string, options?: any): any {
    return;
  }

  getLatAndLon(searchString: string): Observable<any> {
    return of({coord: {lat: 30, long: 10}});
  }
}
