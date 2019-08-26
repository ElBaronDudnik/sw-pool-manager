import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-graph',
    templateUrl: './graph.component.html',
})
export class GraphComponent {
    @Input() index;
    @Input() currentPool;
    url;
    ngOnChanges(): void {
        this.url = `https://api.thingspeak.com/channels/${this.currentPool}/charts/${this.index}`
    }
}