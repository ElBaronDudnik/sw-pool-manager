import {ChangeDetectorRef, Component, Input, OnChanges} from '@angular/core';

@Component({
    selector: 'app-graph',
    templateUrl: './graph.component.html',
})
export class GraphComponent implements OnChanges {
    @Input() index;
    @Input() currentPool;
    @Input() results;
    url;

    constructor(private cdr: ChangeDetectorRef) {}

    ngOnChanges(): void {
        console.log(this.results);
        this.reDefineGraph();
    }

    reDefineGraph(w = 450, h = 260) {
      console.log(w, h);
      this.url = `https://api.thingspeak.com/channels/${this.currentPool}/charts/${this.index}?results=${this.results}&width=${w}&height=${h}`;
      this.cdr.detectChanges();
    }

    onResize(event) {
      if (event.target.outerWidth < 600) {
        console.log(event.target.outerWidth);
        const width = event.target.outerWidth - 50;
        const height = event.target.outerWidth / 1.5;
        this.reDefineGraph(width, height);
      }
    }
}
