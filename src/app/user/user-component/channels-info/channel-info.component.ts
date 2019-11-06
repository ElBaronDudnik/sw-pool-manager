import {Component, Output, EventEmitter, Input, OnInit, ChangeDetectorRef} from '@angular/core';
import { DataService } from 'src/app/shared/data.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-channel-info',
    templateUrl: './channel-info.component.html',
    styleUrls: ['./channel-info.component.css'],
})
export class ChannelInfoComponent implements OnInit {
    @Output() onchangeGraph = new EventEmitter();
    @Input() currentPool;
    channelInfo = [];
    currentUser;
    subscription;
    constructor(private dataService: DataService,
                private cdr: ChangeDetectorRef) {}
    ngOnInit() {
        this.subscription = this.dataService.getInfo(this.currentPool);
        this.subscription.subscribe(data => {
          this.channelInfo = data;
          this.cdr.detectChanges();
        });
    }
    changeGraph(index) {
        this.onchangeGraph.emit([index, this.currentPool]);
        this.cdr.detectChanges();
    }
}
