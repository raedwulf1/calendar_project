import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCalendarComponent } from './main-calendar.component';

describe('MainCalendarComponent', () => {
  let component: MainCalendarComponent;
  let fixture: ComponentFixture<MainCalendarComponent>;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        MainCalendarComponent
       ],
      providers: [
      ],
      imports: [
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(MainCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
