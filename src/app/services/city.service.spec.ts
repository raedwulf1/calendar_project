import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { TestBed, inject } from '@angular/core/testing';
import { CityService } from './city.service';

describe('Service: City', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CityService
      ],
      imports: [
        HttpClientTestingModule
      ]
    });
  });

  it('should ...', inject([CityService], (service: CityService) => {
    expect(service).toBeTruthy();
  }));
});
