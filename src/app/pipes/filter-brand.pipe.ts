import { Pipe, PipeTransform } from '@angular/core';
import { Brand } from '../models/brand';
import { Car } from '../models/car';

@Pipe({
  name: 'filterBrand',
})
export class FilterBrandPipe implements PipeTransform {
  transform(value: Brand[], filterText: string): Brand[] {
    filterText = filterText ? filterText.toLocaleUpperCase() : '';
    return filterText
      ? value.filter(
          (b: Brand) => b.name.toLocaleUpperCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
