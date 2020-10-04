export class City {
  name: string;
  apiCityKey: string;
  lat?: number;
  lon?: number;
  constructor(name: string = '', apiCityKey: string = ''){
    this.name = name;
    this.apiCityKey = apiCityKey;
  }
}
