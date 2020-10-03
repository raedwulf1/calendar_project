import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { TrimArrayPipe } from './pipes/trim-array.pipe';
import { DayReminderComponent } from './components/calendar/day-reminder/day-reminder.component';
import { WeatherService } from './services/weather.service';
import { HttpClientModule } from '@angular/common/http';
import { MainCalendarComponent } from './components/main-calendar/main-calendar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogReminderComponent } from './components/calendar/dialog-reminder/dialog-reminder.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReminderLabelComponent } from './components/calendar/day-reminder/reminder-label/reminder-label.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    MainCalendarComponent,
    TrimArrayPipe,
    DayReminderComponent,
    DialogReminderComponent,
    ReminderLabelComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [
    WeatherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
