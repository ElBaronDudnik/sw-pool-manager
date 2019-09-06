import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'minutes'
})
export class MinutesPipe implements PipeTransform {
  transform(value): any {
    return value < 10 ? '0' + value : value;
  }
}
