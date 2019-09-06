import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../../shared/api.service';
import { DataService } from '../../../shared/data.service';

export class Modes {
  name: string;
  day: any;
  hours: any;
  minutes: any;
  state: any;

  constructor(day, hours, minutes, state) {
    this.day = day,
    this.hours = hours,
    this.minutes = minutes,
     this.state = state;
  }
}

@Component({
  selector: 'app-mode-configuration',
  templateUrl: './mode-configuration.component.html',
  styleUrls: ['./mode-configuration.component.css']
})
export class ModeConfigurationComponent implements OnInit {
  adminData = [];
  modesNames = ['стандартный', 'отпуск', 'интенсивный', 'пользовательский'];
  private tableAttributes;
  modesData = [{
    name: 'отпуск',
    command: 51,
    value: [
      {day: 1, hours: 6, minutes: 0, state: 1},
      {day: 1, hours: 18, minutes: 40, state: 0},
      {day: 2, hours: 7, minutes: 10, state: 1},
      {day: 3, hours: 11, minutes: 30, state: 0}
    ]}, {
    name: 'стандартный',
    command: 11,
    value: [
      {day: 1, hours: 6, minutes: 0, state: 1},
      {day: 1, hours: 18, minutes: 40, state: 0},
      {day: 2, hours: 7, minutes: 10, state: 1},
      {day: 3, hours: 11, minutes: 30, state: 0}
    ]},
    {
      name: 'интенсивный',
      command: 111,
      value: [
        {day: 1, hours: 6, minutes: 0, state: 1},
        {day: 1, hours: 18, minutes: 40, state: 0},
        {day: 2, hours: 7, minutes: 10, state: 1},
        {day: 3, hours: 11, minutes: 30, state: 0}
      ]},
    {
      name: 'пользовательский',
      command: 151,
      value: [
        {day: 1, hours: 6, minutes: 0, state: 1},
        {day: 1, hours: 18, minutes: 40, state: 0},
        {day: 2, hours: 7, minutes: 10, state: 1},
        {day: 3, hours: 11, minutes: 30, state: 0}
      ]}
  ];
  constructor(private apiService: ApiService,
              private dataService: DataService) {}

  ngOnInit() {
    // this.dataService.getAdmin(25).subscribe(data => {
    //   this.adminData = data;
    //   const tableAttributes = this.readQuantityRows();
    //   this.dataService.getAdmin(tableAttributes.rows + 2).subscribe(d => {
    //     this.adminData = d;
    //     console.log(tableAttributes.rows);
    //     if (tableAttributes.rows < 33) {
    //       for (let i = tableAttributes.rows - 1; i >= 0; i--) {
    //         console.log(i);
    //         if (this.adminData[7].value[i] !== null) {
    //           this.decodeRow(i);
    //         }
    //       }
    //     } else {
    //       console.log('More than 33 row', tableAttributes.rows);
    //     }
    //   });
    // });

    this.dataService.getAdmin(1)
      .toPromise()
      .then(data => {
        this.adminData = data;
        this.tableAttributes = this.readQuantityRows(0);
        console.log(this.tableAttributes.rows)
        this.dataService.getAdmin(this.tableAttributes.row + 2).subscribe(d => {
          this.adminData = d;
          if (this.tableAttributes.rows < 33) {
            for (let i = this.tableAttributes.rows - 1; i >= 0; i--) {
              console.log(i, this.adminData);
              if (this.adminData[7].value[i] !== null) {
                this.decodeRow(i);
              }
            }
          } else {
            console.log('More than 33 row', this.tableAttributes.rows);
          }
        });
        // console.log(Number(this.tableAttributes.rows) + 3)
        return this.dataService.getAdmin(this.tableAttributes.rows + 3).toPromise();
      })
      .then(data => {
        this.adminData = data;
        console.log(this.adminData);
        this.tableAttributes = this.readQuantityRows(this.tableAttributes.rows + 3);
        this.dataService.getAdmin(this.tableAttributes.row + 2).subscribe(d => {
          this.adminData = d;
          if (this.tableAttributes.rows < 33) {
            for (let i = this.tableAttributes.rows - 1; i >= 0; i--) {
              console.log(i, this.adminData);
              if (this.adminData[7].value[i] !== null) {
                this.decodeRow(i);
              }
            }
          } else {
            console.log('More than 33 row', this.tableAttributes.rows);
          }
        });
        // console.log(Number(this.tableAttributes.rows) + 3)
        return this.dataService.getAdmin(this.tableAttributes.rows + 3).toPromise();
      });

  }

  addRow(index) {
    if (this.modesData[index].value.length < 34) {
      this.modesData[index].value.push({day: undefined, hours: undefined, minutes: undefined, state: undefined});
    }
  }

  deleteRow(index) {
    this.modesData[index].value.pop();
  }

  clear(index) {
    this.modesData[index].value = [{day: undefined, hours: undefined, minutes: undefined, state: undefined}];
  }

  changeData(text, parentIndex, childIndex, param) {
    const inputValue = parseInt(text, 10);
    this.modesData[parentIndex].value[childIndex][param] = inputValue;
    console.log(this.modesData[parentIndex].value);
  }

  sendTable(index) {
    const command = this.modesData[index].command;
    this.modesData[index].value.forEach((data) => {
      const numberToSend =
        command * 65536 * 256 + (data.day * 10 + data.state)
        * 655536 + data.hours * 256 + data.minutes;
    });
  }

  sendRow(i, j) {
    const command = this.modesData[i].command + j;
    console.log(command);
    const initial = this.modesData[i].value[j];
    const param = command * 65536 * 256 + (initial.day * 10 + initial.state) * 65536 + initial.hours * 256 + initial.minutes;
    this.apiService.sendCommand(param).subscribe();
  }

  readQuantityRows(param) {
    const command = this.adminData[4].values[param];
    const rows = Number(this.adminData[7].values[0]);
    console.log(command, rows);
    this.modesData.push({name: this.modesNames[Math.floor(command / 50)], command: command, value: []});
    return {command, rows};
  }

  decodeRow(rowNumber) {
    console.log(this.adminData);
    const day =  Math.floor(this.adminData[5].values[rowNumber] / 10);
    const state = Math.floor(this.adminData[5].values[rowNumber] % 10);
    const hours = this.adminData[6].values[rowNumber];
    const minutes = this.adminData[7].values[rowNumber];
    this.modesData[4].value.push(new Modes(day, hours, minutes, state));
    console.log(this.modesData[4].value);
  }
}
