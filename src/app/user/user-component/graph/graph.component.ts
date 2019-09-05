import {Component, Input, OnChanges} from '@angular/core';

@Component({
    selector: 'app-graph',
    templateUrl: './graph.component.html',
})
export class GraphComponent implements OnChanges{
    @Input() index;
    @Input() currentPool;
    @Input() results;
    url;
    ngOnChanges(): void {
        this.url = `https://api.thingspeak.com/channels/${this.currentPool}/charts/${this.index}?results=${this.results}`;
    }
}
