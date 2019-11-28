import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { User } from 'firebase';
import { DataService } from '../../../shared/data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/shared/database.service';

export function numberValidator(control: FormControl) {
  const value = Number(control.value);
  return value < 50 && value > 1 ? null : {number: 'fail'};
}

interface DataOutput {
  ledBig: string;
  ledGm: string;
  tempBig: string;
  tempGm: string;
  reserv: string;
}

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {
  currentUser: User;
  itemIndex = 1;
  poolsIndex = 1;
  currentPool;
  public relayInfo = [];

  loading = true;

  dataOutput: DataOutput = {
    ledBig: undefined,
    ledGm: undefined,
    tempBig: undefined,
    tempGm: undefined,
    reserv: undefined,
  };
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private dataService: DataService,
    private dataBase: DatabaseService,
    private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.dataBase.sendCommand(77).then();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.poolsIndex = this.route.snapshot.data.poolNumber;
    // @ts-ignore
    this.currentPool = this.currentUser.pools[this.poolsIndex].poolId;
    this.dataService.getManaging().subscribe(data => {
      this.dataOutput.ledBig = data[0].value;
      this.dataOutput.ledGm = data[1].value;
      this.dataOutput.tempBig = data[2].value;
      this.dataOutput.tempGm = data[3].value;
      this.dataOutput.reserv = data[5].value;
    });
    this.dataBase.getRelayStatus().on('value', (snapshot) => {
      this.relayInfo = snapshot.val();
      this.loading = false;
      this.cdr.detectChanges();
      console.log(this.relayInfo);
    });
  }

  changeGraph([graphIndex]) {
     this.itemIndex = graphIndex + 1;
     this.cdr.detectChanges();
  }

}
