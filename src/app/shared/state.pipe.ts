import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'state'
})
export class StatePipe implements PipeTransform {
  transform(state): any {
    if (state !== undefined) {
      if (typeof state === 'string') {
        state = parseInt(state, 10);
        return state === 1 ? 'Включен' : 'Выключен';
      } else {
        return state ? 'Включен' : 'Выключен';
      }
    }
    return '';
  }
}

