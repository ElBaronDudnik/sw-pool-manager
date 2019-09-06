import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { User } from 'firebase';
import {DataService} from '../../../shared/data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export function numberValidator(control: FormControl) {
  const value = Number(control.value);
  return value < 50 && value > 1 ? null : {number: 'fail'};
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
  hours: FormControl;
  points: FormControl;
  graphForm: FormGroup;
  hoursValue = JSON.parse(localStorage.getItem('hours')) || 20;
  pointsValue = JSON.parse(localStorage.getItem('points')) || 20;
  results = this.hoursValue * this.pointsValue || 200;
  dataOutput = {
    ledBig: undefined,
    ledGm: undefined,
    tempBig: undefined,
    tempGm: undefined,
    reserv: undefined
  };
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private dataService: DataService) {
    this.hours = new FormControl(this.hoursValue, [Validators.required, numberValidator]);
    this.points = new FormControl(this.pointsValue, [Validators.required, numberValidator]);
    this.graphForm = new FormGroup({
      hours: this.hours,
      points: this.points
    });
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.poolsIndex = this.route.snapshot.data.poolNumber;
    this.dataService.getManaging().subscribe(data => {
      this.dataOutput.ledBig = data[0].value;
      this.dataOutput.ledGm = data[1].value;
      this.dataOutput.tempBig = data[2].value;
      this.dataOutput.tempGm = data[3].value;
      this.dataOutput.reserv = data[5].value;
    });
  }

  changeGraph(graphIndex) {
     this.itemIndex = graphIndex + 1;
  }

  changeGraphsOptions(n) {
    if (this.hours.valid && this.points.valid) {
      console.log(n)
      localStorage.setItem('hours', this.hours.value);
      localStorage.setItem('points', this.points.value);
      this.results = n;
    }
  }
}
