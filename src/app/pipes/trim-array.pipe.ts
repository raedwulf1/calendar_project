import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimArray'
})
export class TrimArrayPipe implements PipeTransform {

  transform(array: any, arrayLength: number): any {
    const singleValue = [];
    let valueToAdd = [];

    array.map((day, index) => {
      valueToAdd.push(day);

      if (++index % arrayLength === 0) {
        singleValue.push(valueToAdd);
        valueToAdd = [];
      }
    });
    return singleValue;
  }

}
