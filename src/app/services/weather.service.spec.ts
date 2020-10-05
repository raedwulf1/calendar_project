import { HttpClientTestingModule } from '@angular/common/http/testing';
/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { WeatherService } from './weather.service';

describe('Service: WeatherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WeatherService
      ],
      imports: [
        HttpClientTestingModule
      ]
    });
  });

  it('should ...', inject([WeatherService], (service: WeatherService) => {
    expect(service).toBeTruthy();
  }));
});
