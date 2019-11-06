import {ChangeDetectorRef, Component, Input, OnChanges} from '@angular/core';

@Component({
    selector: 'app-graph',
    templateUrl: './graph.component.html',
    styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnChanges {
    @Input() index;
    @Input() currentPool;
    @Input() results;
    url;
    width;
    height;

    constructor(private cdr: ChangeDetectorRef) {}

    ngOnInit() {
      this.cdr.detectChanges();
    }

    ngOnChanges(): void {
      console.log('changes');
      this.defineSizes();
    }

    reDefineGraph() {
      if (this.width < 450) {
        this.url = `https://api.thingspeak.com/channels/${this.currentPool}/charts/${this.index}?results=${this.results}&width=${this.width}&height=${this.height}`;
      } else {
        this.url = `https://api.thingspeak.com/channels/${this.currentPool}/charts/${this.index}?results=${this.results}`;
      }
      this.cdr.detectChanges();
    }

    defineSizes() {
      if (window.outerWidth < 600) {
        this.width = window.outerWidth - 70;
        this.height = Math.floor(this.width / 1.7);
      } else {
        this.width = 450;
        this.height = 260;
      }
      this.reDefineGraph();
    }
}
