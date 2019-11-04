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
        // this.reDefineGraph();
        this.defineSizes();
    }

    reDefineGraph(w = 450) {console.log(`https://api.thingspeak.com/channels/${this.currentPool}/charts/${this.index}?results=${this.results}&width=${w}`);
      this.url = `https://api.thingspeak.com/channels/${this.currentPool}/charts/${this.index}?results=${this.results}&width=${w}`;
      this.cdr.detectChanges();
    }

    defineSizes() {
      if (window.outerWidth < 600) {
        const width = window.outerWidth - 70;
        // const height = Math.floor(width / 1.7);
        this.reDefineGraph(width);
      }
      this.reDefineGraph();
    }
}
