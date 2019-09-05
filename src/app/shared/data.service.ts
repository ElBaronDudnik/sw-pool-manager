import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { tap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

class Fields {
    fieldNumber: string;
    name: string;
    value: string;
    constructor(fieldNumber, name, value) {
        this.fieldNumber = fieldNumber;
        this.name = name;
        this.value = value || 0;
    }
}

@Injectable({
    providedIn: 'root'
})
export class DataService {
    channelInfo = [];
    managingInfo = [];
    sensorsInfo = [];
    result;
    constructor(private apiService: ApiService) {
    }
    rebuildInfo(obj) {
      const feeds = obj['feeds'];
      const channel = obj['channel'];
      this.result = [];
      for (let propFeeds in feeds[0]) {
        for (let propChannel in channel) {
          if (propFeeds === propChannel && propChannel !== 'created_at') {
            const propName = channel[propChannel];
            const propValue = feeds[0][propFeeds]
            this.result.push(new Fields(propChannel, propName, propValue));
          }
        }
      }
      return this.result;
    }
    getInfo(channelNumber) {
        return this.apiService.getInfo(channelNumber)
            .pipe(
                tap(obj => {
                  this.channelInfo = this.rebuildInfo(obj);
                }),
                switchMap(obj => of(this.channelInfo))
            );
    }
    getManaging() {
      return this.apiService.getManaging()
        .pipe(
          tap(obj => {
            this.managingInfo = this.rebuildInfo(obj);
          }),
          switchMap(obj => of(this.managingInfo))
        );
    }
    getSensors() {
      return this.apiService.getSensors()
        .pipe(
          tap(obj => {
            this.sensorsInfo = this.rebuildInfo(obj);
          }),
          switchMap(obj => of(this.sensorsInfo))
        );
    }
}
