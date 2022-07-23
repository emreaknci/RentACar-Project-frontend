import { Pipe, PipeTransform } from '@angular/core';
import { Color } from '../models/color';

@Pipe({
  name: 'filterColor',
})
export class FilterColorPipe implements PipeTransform {
  transform(value: Color[], filterText: string): Color[] {
    filterText = filterText ? filterText.toLocaleUpperCase() : '';
    return filterText
      ? value.filter(
          (c: Color) => c.name.toLocaleUpperCase().indexOf(filterText) !== -1
        )
      : value;
  }
}
