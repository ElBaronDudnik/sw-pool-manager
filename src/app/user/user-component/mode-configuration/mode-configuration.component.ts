import { Component, OnInit } from '@angular/core';

export class Modes {
  name: string;
  day: number;
  hours: number;
  minutes: number;
  state: boolean;

  constructor(day, hours, minutes, state) {
    this.day = day || '',
      this.hours = hours || '',
      this.minutes = minutes || '',
      this.state = state || '';
  }
}

@Component({
  selector: 'app-mode-configuration',
  templateUrl: './mode-configuration.component.html',
  styleUrls: ['./mode-configuration.component.css']
})
export class ModeConfigurationComponent implements OnInit {
  displayedColumns: string[] = ['day', 'hours', 'minutes', 'state'];
  modesData = [{
    name: 'отпуск',
    value: [
      {day: 1, hours: 6, minutes: 0, state: true},
      {day: 1, hours: 18, minutes: 40, state: false},
      {day: 2, hours: 7, minutes: 10, state: true},
      {day: 3, hours: 11, minutes: 30, state: false}
    ]}, {
    name: 'стандартный',
    value: [
      {day: 1, hours: 6, minutes: 0, state: true},
      {day: 1, hours: 18, minutes: 40, state: false},
      {day: 2, hours: 7, minutes: 10, state: true},
      {day: 3, hours: 11, minutes: 30, state: false}
    ]}];
  constructor() { }

  ngOnInit() {
  }
  addRow() {
    this.modesData[0].value.push({day: 0, hours: 0, minutes: 0, state: true});
    console.log(this.modesData[0].value)
  }
  removeRow() {
    this.displayedColumns.push();
  }
}
