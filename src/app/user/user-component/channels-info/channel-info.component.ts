import { Component, Output, EventEmitter, Input } from "@angular/core";
import { ApiService } from 'src/app/shared/api.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
    selector: 'app-channel-info',
    templateUrl: './channel-info.component.html',
    styleUrls: ['./channel-info.component.css'],
})
export class ChannelInfoComponent {
    @Output() onchangeGraph = new EventEmitter();
    @Input() currentPool;
    channelInfo = [];
    subscription;
    constructor(private dataService: DataService) {}
    ngOnInit(){
        console.log(this.channelInfo)
        this.subscription = this.dataService.getInfo(this.currentPool);
        this.subscription.subscribe(data => this.channelInfo = data);
    }
    changeGraph(index){
        this.onchangeGraph.emit(index);
    }
    
}