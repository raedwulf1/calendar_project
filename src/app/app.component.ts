import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'calendar';

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit(): void {
    // this.weatherService.get('http://dataservice.accuweather.com/forecasts/v1/daily/5day/353020?apikey=9GQ7OJoh3PH3t6COmSKH0rqjyhvJbxoJ')
    //   .subscribe((value) => {
    //     // console.log(value);
    //   });
  }

}
