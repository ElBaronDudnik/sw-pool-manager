import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../../shared/api.service';
import { DataService } from '../../../shared/data.service';
import {FormControl} from '@angular/forms';
import { DatabaseService } from 'src/app/shared/database.service';

export class ModeTables {
  name: ModesNames;
  value: ModeValues[];
  rows: number;

  constructor(props) {
    this.name = props.name;
    this.value = props.value;
    this.rows = props.rows;
  }
}

export class ModeValues {
  day: string | number;
  hours: string | number;
  minutes: string | number;
  state: string | number;

  constructor(props) {
    this.day = props.day,
    this.hours = props.hours,
    this.minutes = props.minutes,
    this.state = props.state;
  }
}


const CUBE_256 = Math.pow(256, 3);
const SQUARED_256 = Math.pow(256, 2);

enum ModesNames {
  standart = 'стандартный',
  vacation = 'отпуск',
  intensive = 'интенсивный',
  user = 'пользовательский',
}

@Component({
  selector: 'app-mode-configuration',
  templateUrl: './mode-configuration.component.html',
  styleUrls: ['./mode-configuration.component.css']
})
export class ModeConfigurationComponent implements OnInit {
  adminData = [];
  public progressMode = 'determinate';
  public progressValue = 0;
  public progressBufferValue = 75;
  public modesNames = ['стандартный', 'отпуск', 'интенсивный', 'пользовательский'];
  public modesCommands = [10, 35, 60, 85];
  public daysControl: FormControl;
  public hoursControl: FormControl;
  public minutesControl: FormControl;
  public stateControl: FormControl;
  public loading = false;
  private time = 0;
  public timeDif = 3;
  modesData = [];
  constructor(private apiService: ApiService,
              private dataService: DataService,
              private dataBase: DatabaseService) {
  }

  ngOnInit() {
    // this.readTablesFromServer();
    this.dataBase.getModeTables().subscribe(data => this.filloutTables(data));
    // this.dataBase.getAlarms().subscribe(data => console.log('Alarms' + data));
    const date = this.dataBase.getAlarms();
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


  filloutTables(tables) {
    this.modesData = [];

    // tslint:disable-next-line:forin
    for (const value in tables) {
      const valuesArray = [];
      tables[value].forEach((item) => {
        if (item) {
          valuesArray.push(new ModeValues({
            day: item.day,
            hours: item.hours,
            minutes: item.minutes,
            state: item.state
          }));
        }
      });

      this.modesData.push({name: ModesNames[value], value: valuesArray});
    }
    this.createFormControls();
  }

  sendAllTables(): void {
    //this.dataBase.sendTablesData(this.modesData).subscribe();
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

  // changeTime(newTime) {
  //   console.log(newTime);
  //   this.timeDif = Number(newTime);
  // }
  //
  // readTablesFromServer() {
  //   this.dataService.getTables(1)
  //     .subscribe(lastData => {
  //       this.adminData = lastData;
  //       const rows = this.readQuantityRows();
  //
  //       if (rows < 100 && rows > 0) {
  //         this.decodeTableData(rows);
  //       }
  //       if (localStorage.getItem('tableData')) {
  //         this.modesData = JSON.parse(localStorage.getItem('tableData'));
  //       } else {
  //         this.createClearTables();
  //       }
  //       this.createFormControls();
  //     });
  // }
  //
  // decodeTableData(rows) {
  //   this.dataService.getTables(rows + 5).subscribe(allData => {
  //     this.adminData = allData;
  //     this.modesData.forEach( table => table.value = []);
  //
  //     this.adminData[0].values.forEach((command, index) => {
  //       if (command > 10 && command < 35) {
  //         this.modesData[0].value.push(this.decodeRow(index, rows));
  //       }
  //       if (command > 35 && command < 60) {
  //         this.modesData[1].value.push(this.decodeRow(index, rows));
  //       }
  //       if (command > 60 && command < 85) {
  //         this.modesData[2].value.push(this.decodeRow(index, rows));
  //       }
  //       if (command > 85 && command < 110) {
  //         this.modesData[3].value.push(this.decodeRow(index, rows));
  //       }
  //     });
  //
  //   });
  // }

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

  changeData(el, parentIndex, childIndex, param) {
    const inputValue = parseInt(el.target.value, 10);
    if (this.checkValues(param, inputValue)) {
      el.target.className = '';
      this.modesData[parentIndex].value[childIndex][param] = inputValue;
      localStorage.setItem('tableData', JSON.stringify(this.modesData));
    } else {
      el.target.className = 'error';
    }
  }

  removeBlur(event) {
    event.target.blur();
  }

  // sendAllTables() {
  //   console.log(this.adminData[3].value);
  //   // if (this.adminData[3].value != 0) {
  //   const arrayTableData = [];
  //   this.loading = true;
  //   this.loaderProgress();
  //   // this.modesData.forEach((table, index) => {
  //   //   this.sendTable(index);
  //   // });
  //   for (const index in this.modesData) {
  //     arrayTableData.push(...this.sendTable(index));
  //   }
  //   console.log(arrayTableData);
  //   arrayTableData.push(this.calcTechCommand(9));
  //   this.sendToServer(arrayTableData);
  //   // this.sendToServer(this.calcTechCommand(9));
  //   // }
  // }
  //
  // calcTechCommand(command) {
  //   const itemToSend = Math.pow(50, 3) * this.modesData[3].value.length
  //     + Math.pow(50, 2) * this.modesData[2].value.length + 50
  //     * this.modesData[1].value.length + this.modesData[0].value.length;
  //
  //   return command * 65536 * 256 + itemToSend;
  // }
  //
  // sendTable(index) {
  //   const numberToSend = [];
  //   let controlSum = 0;
  //
  //   this.modesData[index].value.forEach((data, rowIndex) => {
  //     const command = +this.modesData[index].command + rowIndex + 1;
  //     numberToSend.push(
  //       command * CUBE_256 + (data.day * 10 + data.state)
  //       * SQUARED_256 + data.hours * 256 + data.minutes);
  //     controlSum += (data.day + data.state + data.hours + data.minutes) * (rowIndex + 1);
  //   });
  //
  //   numberToSend.push((this.modesData[index].command + 25) * CUBE_256 + controlSum);
  //   return numberToSend;
  //   // this.sendToServer(numberToSend);
  // }
  //
  // sendToServer(arr) {
  //   const promisedArray = [];
  //   arr.forEach((item, index) => {
  //     const promise = new Promise((resolve) => {
  //       setTimeout(() => {
  //         resolve(this.apiService.sendCommand(item).subscribe());
  //       }, this.time);
  //       this.time += this.timeDif * 1000;
  //     });
  //     promisedArray.push(promise);
  //   });
  //
  //   Promise.all(promisedArray)
  //     .then((values) => {})
  //     .catch((error) => console.error(error));
  // }
  //
  // loaderProgress() {
  //   let loaderTime = 0;
  //   this.modesData.forEach(table => {
  //     loaderTime += table.value.length;
  //   });
  //   loaderTime = (loaderTime + 5) * this.timeDif * 1000;
  //
  //   setTimeout(() => {
  //     this.loading = false;
  //     this.progressValue = 0;
  //   }, loaderTime);
  //
  //   const timerId = setInterval(() => this.progressValue += 0.1, loaderTime / 1000);
  //   setTimeout(() => { clearInterval(timerId); }, loaderTime);
  // }
  //
  // readQuantityRows() {
  //   if (this.adminData[0].values[0] === '9.00') {
  //     const tableS = Math.floor(this.adminData[1].values[0]);
  //     const tableV = Math.floor(this.adminData[2].values[0]);
  //     const tableU = Math.floor(this.adminData[3].values[0] / 50);
  //     const tableI = Math.floor(this.adminData[3].values[0] % 50);
  //     const tables = [tableS, tableV, tableI, tableU];
  //     let sum = 0;
  //     console.log(tables);
  //     for (let i = 0; i < 4; i++) {
  //       sum += tables[i];
  //       this.modesData.push({name: this.modesNames[i], command: this.modesCommands[i], value: [], rows: tables[i]});
  //     }
  //     return sum;
  //   } else {
  //     return null;
  //   }
  // }
  //
  // decodeRow(rowNumber, rows) {
  //   const day =  Math.floor(this.adminData[1].values[rowNumber] / 10).toFixed();
  //   const state = Math.floor(this.adminData[1].values[rowNumber] % 10).toFixed();
  //   const hours = (+this.adminData[2].values[rowNumber]).toFixed();
  //   const minutes = (+this.adminData[3].values[rowNumber]).toFixed();
  //   return new ModeValues({day: Number(day), hours: Number(hours), minutes: Number(minutes), state: Number(state)});
  // }
}
