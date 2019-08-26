import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { tap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

class Fields {
    fieldNumber: String;
    name: String;
    value: String;
    constructor(fieldNumber, name, value) {
        this.fieldNumber = fieldNumber;
        this.name = name;
        this.value = value || 0;
    }
}

@Injectable({
    'providedIn': 'root'
})
export class DataService {
    channelInfo = [];
    numberOfGraph = 1;

    constructor(private apiService: ApiService) {
    }
    getInfo(channelNumber){
        return this.apiService.getInfo(channelNumber)
            .pipe(
                tap(obj => {
                    const feeds = obj['feeds'];
                    const channel = obj['channel'];
                    this.channelInfo = [];
                    for (let propFeeds in feeds[0]){
                        for (let propChannel in channel){
                            if (propFeeds == propChannel && propChannel != 'created_at') {
                                const propName = channel[propChannel];
                                const propValue = feeds[0][propFeeds]
                                this.channelInfo.push(new Fields(propChannel, propName, propValue));
                            }
                        }
                    }
                }),
                switchMap(obj => of(this.channelInfo))
            )
    }
}