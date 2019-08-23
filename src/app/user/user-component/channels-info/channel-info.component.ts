import { Component } from "@angular/core";
import { ApiService } from 'src/app/shared/api.service';
import { filter, map } from 'rxjs/operators';

@Component({
    selector: 'app-channel-info',
    templateUrl: './channel-info.component.html',
    styleUrls: ['./channel-info.component.css'],
})
export class ChannelInfoComponent {
    channelNumber = 719005;
    channelInfo = {};
    constructor(private apiService: ApiService) {}
    ngOnInit(){
        this.getInfo();
        console.log(this.channelInfo)
    }
    getInfo(){
        this.apiService.getInfo(this.channelNumber)
        .subscribe(data => this.channelInfo = data);
    }
}