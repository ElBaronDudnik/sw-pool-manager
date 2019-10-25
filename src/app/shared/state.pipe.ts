import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'state'
})
export class StatePipe implements PipeTransform {
  transform(state): any {
    if (state !== undefined) {
      state = parseInt(state, 10);
      return state === 1 ? 'Включено' : 'Выключено';
    }
    return '';
  }
}

