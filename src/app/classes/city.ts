export class City {
  name: string;
  apiCityKey: string;
  constructor(name: string = '', apiCityKey: string = ''){
    this.name = name;
    this.apiCityKey = apiCityKey;
  }
}
