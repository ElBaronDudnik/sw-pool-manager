import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../shared/api.service';
import { DataService } from '../../../shared/data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export function temperatureValidator(control: FormControl) {
  const value = +control.value;
  return value > 1 && value < 50 ? null : {temperature: 'fail'};
}
export function hysteresisValidator(control: FormControl) {
  const value = +control.value;
  return control.value > 0.1 && control.value < 3 ? null : {hysteresis: 'fail'};
}

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  color = 'accent';
  checkedBig = false;
  checkedGm = false;
  checkedRelay = false;
  disabled = false;
  sensorsInfo = [];
  managingInfo = [];
  adminInfo = [];
  temperatureBig: number;
  temperatureGm: number;
  tempDesconeBig: string;
  tempDesconeGm: string;
  hysteresisBig: number;
  hysteresisGm: number;
  heaterBig: boolean;
  heaterGm: boolean;
  waterTreatment: boolean;
  selectedValue;
  settingsBig: FormGroup;
  settingsGm: FormGroup;
  modes = ['стандартный', 'отпуск', 'интенсивный', 'пользовательский'];

  constructor(private dataService: DataService,
              private apiService: ApiService) {
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
    this.dataService.getManaging().subscribe(data => {
      this.managingInfo = data;
      // this.checkedBig = !!this.managingInfo[0].value;
      // this.checkedGm = !!this.managingInfo[1].value;
      // this.checkedRelay = !!this.managingInfo[5].value;
      console.log(data, this.checkedBig, this.checkedGm);
    });
    this.dataService.getSensors().subscribe(data =>  {
      this.sensorsInfo = data;
      console.log(data);
    });
    this.dataService.getAdmin(2).subscribe(data => {
      console.log(data, 'admin');
      this.adminInfo = data;
      this.logData();
      this.decodeBits();
    });
    this.apiService.temperatureTake().subscribe(data => {
      console.log(data);
      // @ts-ignore
      this.tempDesconeBig = data.feeds[0].field7;
      // @ts-ignore
      this.tempDesconeGm = data.feeds[0].field8;
    });
  }

  decodeBits() {
    const workingNumber = Math.floor(+this.adminInfo[3].values[1] / 2048).toString(2).split('');
    console.log(workingNumber);
    this.checkedBig = !!+workingNumber[0];
    this.checkedGm = !!+workingNumber[1];
    this.heaterBig = !!+workingNumber[2];
    this.heaterGm = !!+workingNumber[3];
    this.waterTreatment = !!+workingNumber[4];
    this.checkedRelay = !!+workingNumber[5];
    console.log(this.waterTreatment);
  }

  logData() {
    this.temperatureBig = Math.floor(this.adminInfo[1].values[1] / 100) / 10;
    this.temperatureGm =  Math.floor(this.adminInfo[2].values[1] / 100) / 10;
    this.hysteresisBig = Math.floor(this.adminInfo[1].values[1] % 100) / 10;
    this.hysteresisGm = Math.floor(this.adminInfo[2].values[1] % 100) / 10;
    this.selectedValue = this.modes[Math.floor(this.adminInfo[0].values[1] / 10) - 10];
  }
  changeLedBig() {
    this.checkedBig = !this.checkedBig;
    console.log(this.checkedBig);
    const param = this.checkedBig ? 40 : 41;
    this.apiService.sendCommand(param).subscribe(data => console.log(data));
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

