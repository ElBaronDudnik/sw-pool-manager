import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ModeDialogComponent} from '../mode-dialog/mode-dialog.component';
import {ApiService} from '../../../shared/api.service';
import {DataService} from '../../../shared/data.service';

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
  selectedValue = 'отпуск';
  modes = ['стандартный', 'отпуск', 'интенсивный', 'пользовательский'];
  // managingInfo = {
  //   'освещение большого бассейна': 0,
  //   'освещение гидромассажного бассейна': 0,
  //   'температура большого бассейна': 0,
  //   'температура гидромассажного бассейна': 0,
  //   'очистка воды': 0,
  //   'резерв': 0,
  // }
  constructor(private dataService: DataService,
              private apiService: ApiService) { }

  ngOnInit() {
    this.dataService.getManaging().subscribe(data => {
      this.managingInfo = data;
      this.checkedBig = !!this.managingInfo[0].value;
      this.checkedGm = !!this.managingInfo[1].value;
      this.checkedRelay = !!this.managingInfo[5].value;
      console.log(data, this.checkedBig, this.checkedGm);
    });
    this.dataService.getSensors().subscribe(data =>  {
      this.sensorsInfo = data;
      console.log(data);
    });
  }
  changeLedBig() {
    this.checkedBig = !this.checkedBig;
    console.log(this.checkedBig);
    const param = this.checkedBig ? 69909 : 70028;
    this.apiService.sendCommand(param).subscribe(data => console.log(data));
  }
  changeLedGm() {
    this.checkedGm = !this.checkedGm;
    console.log(this.checkedGm);
    const param = this.checkedGm ?  69919 : 70028;
    this.apiService.sendCommand(param).subscribe(data => console.log(data));
  }
  changeRelay() {
    this.checkedRelay = !this.checkedRelay;
    console.log(this.checkedRelay);
    const param = this.checkedRelay ? 44 : 45;
    this.apiService.sendCommand(param).subscribe(data => console.log(data));
  }
  changeMode(value) {
    console.log(value);
  }
}
