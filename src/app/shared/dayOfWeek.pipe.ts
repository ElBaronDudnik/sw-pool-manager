import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'dayOfWeek'
})
export class DayOfWeekPipe implements PipeTransform {
  transform(day): any {
    if (typeof day === 'string') {
      // tslint:disable-next-line:radix
      day = parseInt(day);
    }
    switch (day) {
      case 1 || 'Пн':
        return 'Пн';
      case 2 || 'Вт':
        return 'Вт';
      case 3 || 'Ср':
        return 'Ср';
      case 4 || 'Чт':
        return 'Чт';
      case 5 || 'Пт':
        return 'Пт';
      case 6 || 'Сб':
        return 'Сб';
      case 7 || 'Вс':
        return 'Вс';
      default:
        return '';
    }
  }
}
