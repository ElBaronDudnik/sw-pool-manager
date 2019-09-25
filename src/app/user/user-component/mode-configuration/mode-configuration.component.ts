import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../../shared/api.service';
import { DataService } from '../../../shared/data.service';
import {FormControl} from '@angular/forms';

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

const CUBE_256 = Math.pow(256, 3);
const SQUARED_256 = Math.pow(256, 2);

@Component({
  selector: 'app-mode-configuration',
  templateUrl: './mode-configuration.component.html',
  styleUrls: ['./mode-configuration.component.css']
})
export class ModeConfigurationComponent implements OnInit {
  adminData = [];
  public modesNames = ['стандартный', 'отпуск', 'интенсивный', 'пользовательский'];
  public modesCommands = [10, 35, 60, 85];
  public daysControl: FormControl;
  public hoursControl: FormControl;
  public minutesControl: FormControl;
  public stateControl: FormControl;
  public loading = false;
  private time = 0;
  modesData = [];
  constructor(private apiService: ApiService,
              private dataService: DataService) {
  }

  ngOnInit() {
    this.readTablesFromServer();
  }

  createFormControls() {
    this.daysControl = new FormControl({
        debounce: 1000,
        updateOn: ['blur', 'keyup.enter']
      });
    this.hoursControl = new FormControl({
      debounce: 1000,
      updateOn: ['blur', 'keyup.enter']
    });
    this.minutesControl = new FormControl({
      debounce: 1000,
      updateOn: ['blur', 'keyup.enter']
    });
    this.stateControl = new FormControl({
      debounce: 1000,
      updateOn: ['blur', 'keyup.enter']
    });
  }

  checkValues(param, value) {
    switch (param) {
      case 'day':
        return value > 0 && value < 8 ? true : false;
      case 'hours':
        return value >= 0 && value < 24 ? true : false;
      case 'minutes':
        return value >= 0 && value < 60 ? true : false;
      case 'state':
        return value === 0 || value === 1 ? true : false;
    }
  }

  readTablesFromServer() {
    this.dataService.getAdmin(1)
      .subscribe(lastData => {
        this.adminData = lastData;
        const rows = this.readQuantityRows();

        if (rows < 100 && rows > 0) {
          this.decodeTableData(rows);
        }
        if (localStorage.getItem('tableData')) {
          this.modesData = JSON.parse(localStorage.getItem('tableData'));
        } else {
          this.createClearTables();
        }
        this.createFormControls();
      });
  }

  decodeTableData(rows) {
    this.dataService.getAdmin(rows + 4).subscribe(allData => {
      this.adminData = allData;

      this.adminData[4].values.forEach((command, index) => {
        if (command > 10 && command < 35) {
          this.modesData[0].value.push(this.decodeRow(index, rows));
        }
        if (command > 35 && command < 60) {
          this.modesData[1].value.push(this.decodeRow(index, rows));
        }
        if (command > 60 && command < 85) {
          this.modesData[2].value.push(this.decodeRow(index, rows));
        }
        if (command > 85 && command < 110) {
          this.modesData[3].value.push(this.decodeRow(index, rows));
        }
      });

    });
  }

  createMode(modeConfig?) {
    modeConfig = Object.assign({
      day: null,
      hours: null,
      minutes: null,
      state: null,
    }, modeConfig);

    return modeConfig;
  }

  createClearTables() {
    this.modesData = [];
    for (let i = 0; i < 4; i++) {
      const tableValue = Array.of(this.createMode());
      this.modesData.push({name: this.modesNames[i], command: this.modesCommands[i], value: tableValue, rows: 0});
    }
  }

  addRow(tableIndex, rowIndex) {
    if (this.modesData[tableIndex].value.length < 25) {
      this.modesData[tableIndex].value.splice(rowIndex + 1, 0, this.createMode());
    }
  }

  deleteRow(tableIndex, rowIndex) {
    this.modesData[tableIndex].value = this.modesData[tableIndex].value.filter((row, index) => index !== rowIndex);
  }

  clear(index) {
    const clearTable = Array.of(this.createMode());
    this.modesData[index].value = clearTable;
  }

  changeData(text, parentIndex, childIndex, param) {
    const inputValue = parseInt(text, 10);
    this.modesData[parentIndex].value[childIndex][param] = inputValue;
    localStorage.setItem('tableData', JSON.stringify(this.modesData));
  }

  removeBlur(event) {
    event.target.blur();
  }

  sendAllTables() {
    this.loading = true;
    this.modesData.forEach((table, index) => {
      this.sendTable(index);
    });

    this.sendToServer(this.calcTechCommand(9));
  }

  calcTechCommand(command) {
    const itemToSend = Math.pow(50, 3) * this.modesData[3].value.length
      + Math.pow(50, 2) * this.modesData[2].value.length + 50
      * this.modesData[1].value.length + this.modesData[0].value.length;

    return [command * 65536 * 256 + itemToSend];
  }

  sendTable(index) {
    const numberToSend = [];
    let controlSum = 0;

    this.modesData[index].value.forEach((data, rowIndex) => {
      const command = +this.modesData[index].command + rowIndex + 1;
      numberToSend.push(
        command * CUBE_256 + (data.day * 10 + data.state)
        * SQUARED_256 + data.hours * 256 + data.minutes);
      controlSum += (data.day + data.state + data.hours + data.minutes) * (rowIndex + 1);
    });

    numberToSend.push((this.modesData[index].command + 25) * CUBE_256 + controlSum);
    this.sendToServer(numberToSend);
  }

  sendToServer(arr) {
    const promisedArray = [];
    arr.forEach((item, index) => {
      const promise = new Promise((resolve) => {
        this.time += 5000;
        setTimeout(() => {
          resolve(this.apiService.sendCommand(item).subscribe());
        }, this.time);
      });
      promisedArray.push(promise);
    });

    Promise.all(promisedArray)
      .then((values) => console.log(values))
      .catch((error) => console.error(error));
  }

  readQuantityRows() {
    const tableS = Math.floor(this.adminData[5].values[0]);
    const tableV = Math.floor(this.adminData[6].values[0]);
    const tableU = Math.floor(this.adminData[7].values[0] / 50);
    const tableI = Math.floor(this.adminData[7].values[0] % 50);
    const tables = [tableS, tableV, tableI, tableU];
    let sum = 0;
    for (let i = 0; i < 4; i++) {
      sum += tables[i];
      this.modesData.push({name: this.modesNames[i], command: this.modesCommands[i], value: [], rows: tables[i]});
    }
    return sum;
  }

  decodeRow(rowNumber, rows) {
    const day =  Math.floor(this.adminData[5].values[rowNumber] / 10).toFixed();
    const state = Math.floor(this.adminData[5].values[rowNumber] % 10).toFixed();
    const hours = (+this.adminData[6].values[rowNumber]).toFixed();
    const minutes = (+this.adminData[7].values[rowNumber]).toFixed();
    return new Modes(Number(day), Number(hours), Number(minutes), Number(state));
  }
}
