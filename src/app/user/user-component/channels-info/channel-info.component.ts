import {Component, Output, EventEmitter, Input, OnInit} from '@angular/core';
import { DataService } from 'src/app/shared/data.service';

@Component({
    selector: 'app-channel-info',
    templateUrl: './channel-info.component.html',
    styleUrls: ['./channel-info.component.css'],
})
export class ChannelInfoComponent implements OnInit{
    @Output() onchangeGraph = new EventEmitter();
    @Input() currentPool;
    channelInfo = [];
    subscription;
    constructor(private dataService: DataService) {}
    ngOnInit() {
        console.log(this.channelInfo, this.currentPool)
        this.subscription = this.dataService.getInfo(this.currentPool);
        this.subscription.subscribe(data => this.channelInfo = data);
    }
    changeGraph(index) {
        this.onchangeGraph.emit(index);
    }
}
