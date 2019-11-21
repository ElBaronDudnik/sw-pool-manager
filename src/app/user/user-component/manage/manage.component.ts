import {ChangeDetectorRef, Component, NgZone, OnInit} from '@angular/core';
import { ApiService } from '../../../shared/api.service';
import { DataService } from '../../../shared/data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {DatabaseService} from '../../../shared/database.service';
import {from, Observable} from 'rxjs';

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
  disabled = false;

  tempDesconeBig: string;
  tempDesconeGm: string;

  selectedValue;
  settingsBig: FormGroup;
  settingsGm: FormGroup;

  checkedLightBig;
  checkedLigghtGm;

  loading = true;
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

    this.databaseService.getRelayStatus().on('value', snapshot => {
      this.relay = snapshot.val();
      this.loading = false;
      this.cdr.detectChanges();

    });

    this.databaseService.getControls().on('value', snapshot => {
      this.controls = snapshot.val();
      this.selectedValue = ModeNames[this.controls['mode']];
      this.cdr.detectChanges();
    });


    this.dataService.getInfo('859100').subscribe(temp => {
      this.tempDesconeBig = temp[6].value;
    });

    this.dataService.getInfo('859104').subscribe(temp => {
      this.tempDesconeGm = temp[6].value;
    });
  }

  ngDoCheck() {
    console.log(this.checkedLightBig);
  }

  changeLedBig() {
    this.relay['R1-lightBig'] = !this.relay['R1-lightBig'];

    const command = this.relay['R1-lightBig'] ? 40 : 41;
    this.databaseService.sendCommand(command).then();
  }

  changeLedGm() {
    this.relay['R2-lightGM'] = !this.relay['R2-lightGM'];

    const param = this.relay['R2-lightGM'] ?  42 : 43;
    this.databaseService.sendCommand(param).then();
  }

  changeRelay() {
    this.relay['R6-reserve'] = !this.relay['R6-reserve'];

    const param = this.relay['R6-reserve'] ?  44 : 45;
    this.databaseService.sendCommand(param).then();
  }

  changeMode(value) {
    this.databaseService.sendCommand(ModeNames[value]).then();
  }

  changeTemperatureBig() {
    if (this.settingsBig.valid) {
      this.databaseService.sendAny('/control/Temp_FB/tempBig', Number(this.settingsBig.value.temperature));
      this.databaseService.sendAny('/control/Temp_FB/gistBig', Number(this.settingsBig.value.hysteresis));
      this.databaseService.sendCommand(24).then();
    }
  }

  changeTemperatureGm() {
    if (this.settingsGm.valid) {
      this.databaseService.sendAny('/control/Temp_FB/tempBig', Number(this.settingsGm.value.temperature));
      this.databaseService.sendAny('/control/Temp_FB/gistBig', Number(this.settingsGm.value.hysteresis));
      this.databaseService.sendCommand(24).then();
    }
  }
}

