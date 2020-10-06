# Calendar
This a Calendar that help you remind thing based on date and city!
Also you can check the time weather for seven days starting from today (the day that the API makes the call of sure jeje)
You can set a time and a color related to the urgency or necesity to the reminders inside the calendar, and This Calendar will send you a little notification when a reminder comes to its time!

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.7.

## Run the App on Dev

First after get the code of this amazing Calendar, its required to run the command npm install inside the root of the project. Then, be sure that the enviroments files in `src/environments/` have been set with the correct API key for OpenWeatherMap API, then run `ng serve` (or `npm run start`) for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` (or `npm run test`) to execute the unit tests via [Karma](https://karma-runner.github.io).

## Note About the API

The APIKey used for OpenWeatherMapAPI is free so it have a limit of 60 calls per minute, so, it coud be a limitation if you try to call it many times 