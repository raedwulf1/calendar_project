export class City {
  name: string;
  lat?: number;
  lon?: number;
  constructor(name: string = ''){
    this.name = name;
  }
}
