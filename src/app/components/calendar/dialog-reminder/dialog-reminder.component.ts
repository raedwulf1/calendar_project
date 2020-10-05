import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatAutocompleteActivatedEvent, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, timer } from 'rxjs';
import { debounce } from 'rxjs/operators';
import { ApiCity } from 'src/app/classes/api-city';
import { City } from 'src/app/classes/city';
import { Reminder } from 'src/app/classes/reminder';
import { TimeHourMinutes } from 'src/app/classes/time-hour-minutes';
import { CityService } from 'src/app/services/city.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-dialog-reminder',
  templateUrl: './dialog-reminder.component.html',
  styleUrls: ['./dialog-reminder.component.scss']
})
export class DialogReminderComponent implements OnInit, OnDestroy {

  time: string;
  colorOptions = ['Blue', 'Red', 'Green', 'Pink', 'Violet', 'Wheat'];
  cityString = '';
  selectedCity: City;
  locationsFiltered: City[] = [];
  subs = new SubSink();

  constructor(
    public dialogRef: MatDialogRef<DialogReminderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Reminder
    ) {}

  ngOnInit() {
    this.cityString = this.data.city ? this.data.city.name : '';
    this.time = this.data.time ? this.data.time.getStringTime() : '00:00';
  }

  onSelectionChanged(event: MatAutocompleteSelectedEvent) {
    this.cityString = event.option.value.name;
    this.selectedCity = { name: this.cityString, apiCityKey: event.option.value.Key };
  }

  onCityChanged() {
    // this.subs.sink = this.cityService.get(this.cityString)
    // .pipe(debounce(() => timer(200)))
    //   .subscribe((value) => {
    //     this.buildAutoCompleteCities(value);
    //   });
  }

  cancelDialog(): void {
    this.dialogRef.close();
  }

  saveDialog(): void {
    if ((!!this.selectedCity || !!this.cityString) && !!this.data.text && !!this.time) {
      this.data.time = new TimeHourMinutes(Number(this.time.split(':')[0]), Number(this.time.split(':')[1]));
      this.data.city = this.selectedCity || {name: this.cityString, apiCityKey: ''};
      this.dialogRef.close(this.data);
    }
  }

  ngOnDestroy(): void {
    if (!!this.subs) {
      this.subs.unsubscribe();
    }
  }

  buildAutoCompleteCities(cities: ApiCity[]): void{
    if (cities) {
      this.locationsFiltered = [];
      for (const city of cities){
        const cityName = `${city.LocalizedName}, ${city.AdministrativeArea.LocalizedName}, ${city.Country.LocalizedName}`;
        const cityToPush = { name: cityName, apiCityKey: city.Key };
        this.locationsFiltered.push(cityToPush);
      }
    }

  }

}
