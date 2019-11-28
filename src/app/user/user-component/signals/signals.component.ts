import { Component, OnInit } from '@angular/core';
import {User} from 'firebase';
import {ActivatedRoute} from '@angular/router';
import {DatabaseService} from '../../../shared/database.service';

@Component({
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  styleUrls: ['./signals.component.css']
})
export class SignalsComponent implements OnInit {
  currentUser: User;
  itemIndexFirst = 1;
  itemIndexSecond = 1;
  poolsIndex = 1;
  constructor(private route: ActivatedRoute,
              private dataBase: DatabaseService) { }

  ngOnInit() {
    this.dataBase.sendCommand(77).then();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.poolsIndex = this.route.snapshot.data.poolNumber;
    console.log(this.poolsIndex);
  }

  changeGraph([graphIndex, poolIndex]) {
    if (poolIndex === '848346') {
      this.itemIndexFirst = graphIndex + 1;
    }
    if (poolIndex === '848347') {
      this.itemIndexSecond = graphIndex + 1;
    }
  }

}
