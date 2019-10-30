import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { ApiService } from '../../../shared/api.service';
import { DataService } from '../../../shared/data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {DatabaseService} from '../../../shared/database.service';

export function temperatureValidator(control: FormControl) {
  const value = +control.value;
  return value > 1 && value < 50 ? null : {temperature: 'fail'};
}
export function hysteresisValidator(control: FormControl) {
  const value = +control.value;
  return control.value > 0.1 && control.value < 3 ? null : {hysteresis: 'fail'};
}

export enum ModeNames {
  'стандартный' = 101,
  'отпуск' = 111,
  'интенсивный' = 121,
  'пользовательский' = 131
}

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  color = 'accent';
  checkedGm = false;
  checkedRelay = false;
  disabled = false;

  tempDesconeBig: string;
  tempDesconeGm: string;

  selectedValue;
  settingsBig: FormGroup;
  settingsGm: FormGroup;


  alarms;
  controls;
  relay;
  modes = ['стандартный', 'отпуск', 'интенсивный', 'пользовательский'];

  constructor(private dataService: DataService,
              private apiService: ApiService,
              private databaseService: DatabaseService,
              private cdr: ChangeDetectorRef) {
      this.settingsBig = new FormGroup({
        led: new FormControl(''),
        temperature: new FormControl('', [Validators.required, temperatureValidator]),
        hysteresis: new FormControl('', [Validators.required, hysteresisValidator]),
      });
      this.settingsGm = new FormGroup({
        led: new FormControl(''),
        temperature: new FormControl('', [Validators.required, temperatureValidator]),
        hysteresis: new FormControl('', [Validators.required, hysteresisValidator]),
      });
  }

  ngOnInit() {
    this.databaseService.getAlarms().on('value', snapshot => {
      this.alarms = snapshot.val();
      this.cdr.detectChanges();
    });

    this.databaseService.getControls().on('value', snapshot => {
      this.controls = snapshot.val();
      console.log(this.controls);
      this.selectedValue = ModeNames[this.controls['mode']];
      this.cdr.detectChanges();
    });

    this.databaseService.getRelayStatus().on('value', snapshot => {
      this.relay = snapshot.val();
      console.log(this.relay);
      console.log(this.relay && this.relay['R3-heatBig'])
      this.cdr.detectChanges();
    });

    this.dataService.getInfo('859100').subscribe(temp => {
      this.tempDesconeBig = temp[6].value;
    });

    this.dataService.getInfo('859100').subscribe(temp => {
      this.tempDesconeBig = temp[6].value;
    });

    this.dataService.getInfo('859104').subscribe(temp => {
      this.tempDesconeGm = temp[6].value;
    });
  }

  changeLedBig() {
    this.relay['R1-lightBig'] = !this.relay['R1-lightBig'];

    // const param = this.checkedBig ? 40 : 41;
    // this.apiService.sendCommand(param).subscribe(data => console.log(data));
    this.databaseService.sendAny('/relayStatus/R1-lightBig', this.relay['R1-lightBig']);
  }
  changeLedGm() {
    this.checkedGm = !this.checkedGm;
    console.log(this.checkedGm);
    const param = this.checkedGm ?  42 : 43;
    this.apiService.sendCommand(param).subscribe(data => console.log(data));
  }
  changeRelay() {
    this.checkedRelay = !this.checkedRelay;
    console.log(this.checkedRelay);
    const param = this.checkedRelay ? 44 : 45;
    this.apiService.sendCommand(param).subscribe(data => console.log(data));
  }
  changeMode(value) {
    console.log(this.modes.indexOf(value));
    const param = 100 + this.modes.indexOf(value) * 10;
    this.apiService.sendCommand(param).subscribe();
  }
  changeTemperatureBig() {
    const temp = 24 * 65536 + this.settingsBig.value.temperature * 1000 + this.settingsBig.value.hysteresis * 10;
    if (this.settingsBig.valid) {
      this.apiService.sendCommand(temp).subscribe();
    }
  }
  changeTemperatureGm() {
    const temp = 26 * 65536 + this.settingsGm.value.temperature * 1000 + this.settingsGm.value.hysteresis * 10;
    if (temp > 0) {
      this.apiService.sendCommand(temp).subscribe();
    }
  }
}

