import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {numberValidator} from '../channel/channel.component';

@Component({
  selector: 'app-graph-options',
  templateUrl: './graph-options.component.html',
  styleUrls: ['./graph-options.component.css']
})
export class GraphOptionsComponent {
  hours: FormControl;
  points: FormControl;
  graphForm: FormGroup;
  hoursValue = JSON.parse(localStorage.getItem('hours')) || 20;
  pointsValue = JSON.parse(localStorage.getItem('points')) || 20;
  results = this.hoursValue * this.pointsValue || 200;

  @Input() poolsIndex;
  @Input() itemIndex;
  @Input() currentUser;

  constructor() {
    this.hours = new FormControl(this.hoursValue, [Validators.required, numberValidator]);
    this.points = new FormControl(this.pointsValue, [Validators.required, numberValidator]);
    this.graphForm = new FormGroup({
      hours: this.hours,
      points: this.points
    });
  }

  changeGraphsOptions(n) {
    if (this.hours.valid && this.points.valid) {
      localStorage.setItem('hours', this.hours.value);
      localStorage.setItem('points', this.points.value);
      this.results = n;
    }
  }

}
