import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatAutocompleteActivatedEvent, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subscription, timer } from 'rxjs';
import { debounce } from 'rxjs/operators';
import { ApiCity } from 'src/app/classes/api-city';
import { City } from 'src/app/classes/city';
import { Reminder } from 'src/app/classes/reminder';
import { CityService } from 'src/app/services/city.service';

@Component({
  selector: 'app-dialog-reminder',
  templateUrl: './dialog-reminder.component.html',
  styleUrls: ['./dialog-reminder.component.scss']
})
export class DialogReminderComponent implements OnInit, OnDestroy {

  time: string;
  colorOptions = ['blue', 'red', 'green'];
  cityString = '';
  selectedCity: City;
  locationsFiltered: City[] = [];
  subs: Subscription;

  constructor(
    public dialogRef: MatDialogRef<DialogReminderComponent>,
    private cityService: CityService,
    @Inject(MAT_DIALOG_DATA) public data: Reminder
    ) {}

  ngOnInit() {
    this.cityString = this.data.city ? this.data.city.name : '';
  }

  onSelectionChanged(event: MatAutocompleteSelectedEvent ) {
    this.cityString = event.option.value.name;
    this.selectedCity = { name: this.cityString, apiCityKey: event.option.value.Key };
  }

  onCityChanged() {
    this.subs = this.cityService.get(this.cityString)
    .pipe(debounce(() => timer(200)))
      .subscribe((value) => {
        this.buildAutoCompleteCities(value);
      });
  }

  cancelDialog(): void {
    this.dialogRef.close();
  }

  saveDialog(): void {
    if (!!this.selectedCity && !!this.data.text && !!this.time) {
      this.data.time = {hour: Number(this.time.split(':')[0]), minutes: Number(this.time.split(':')[1])};
      this.data.city = this.selectedCity;
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
