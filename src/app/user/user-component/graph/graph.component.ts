import { Component } from "@angular/core";

@Component({
    selector: 'app-graph',
    templateUrl: './graph.component.html',
})
export class GraphComponent {
    url = 'https://api.thingspeak.com/channels/719005/charts/1';
    poolId = 719005;

    ngOnInit(){
        
    }
}