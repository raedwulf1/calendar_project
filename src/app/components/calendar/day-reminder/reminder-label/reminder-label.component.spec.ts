
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';


import { ReminderLabelComponent } from './reminder-label.component';

describe('ReminderLabelComponent', () => {
  let component: ReminderLabelComponent;
  let fixture: ComponentFixture<ReminderLabelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ReminderLabelComponent ],
      providers: [
      ],
      imports: [
        HttpClientTestingModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(ReminderLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
