import { Pipe, PipeTransform } from '@angular/core';
import { CarDetail } from '../models/carDetail';

@Pipe({
  name: 'filterCarDescription',
})
export class FilterCarDescriptionPipe implements PipeTransform {
  transform(value: CarDetail[], filterText: string): CarDetail[] {
    filterText = filterText ? filterText.toUpperCase() : '';
    return filterText
      ? value.filter(
          (c: CarDetail) => c.carDescription.toUpperCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
