
import { async, ComponentFixture, TestBed } from '@angular/core/testing';


import { ReminderLabelComponent } from './reminder-label.component';

describe('ReminderLabelComponent', () => {
  let component: ReminderLabelComponent;
  let fixture: ComponentFixture<ReminderLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReminderLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReminderLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
