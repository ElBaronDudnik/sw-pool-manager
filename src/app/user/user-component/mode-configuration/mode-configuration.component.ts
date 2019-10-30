import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
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
  'стандартный',
  'отпуск',
  'интенсивный',
  'пользовательский',
}

@Component({
  selector: 'app-mode-configuration',
  templateUrl: './mode-configuration.component.html',
  styleUrls: ['./mode-configuration.component.css']
})
export class ModeConfigurationComponent implements OnInit {
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

  modesData = [];
  constructor(private apiService: ApiService,
              private dataService: DataService,
              private dataBase: DatabaseService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.dataBase.getModeTables().on('value', (res) => this.filloutTables(res.val()));
    this.dataBase.getAlarms().on('value', (res) => console.log(res.val()));
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
    this.createFormControls();

    for (const key in tables) {
      const valuesArray = [];
      for (const valueKey in tables[key].value) {
        const item = tables[key].value[valueKey];

        if (item) {
          valuesArray.push(new ModeValues({
            day: item.day,
            hours: item.hours,
            minutes: item.minutes,
            state: item.state
          }));
        }
      }
      this.modesData.push({name: ModesNames[key], value: valuesArray});
    }
    this.cdr.detectChanges();
  }

  sendAllTables(): void {
    this.dataBase.sendTablesData(this.modesData).then();
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

}
