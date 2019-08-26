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
    constructor(private dataService: DataService) {}
    ngOnInit(){
        this.dataService.getInfo(this.currentPool)
            .subscribe(data => this.channelInfo = data)
    }
    changeGraph(index){
        this.onchangeGraph.emit(index);
    }

    
}