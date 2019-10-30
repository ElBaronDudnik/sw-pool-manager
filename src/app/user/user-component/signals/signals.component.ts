import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from 'firebase';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  styleUrls: ['./signals.component.css']
})
export class SignalsComponent implements OnInit {
  currentUser: User;
  itemIndex = 1;
  poolsIndex = 1;
  @Output() changeGraphNumber = new EventEmitter();
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.poolsIndex = this.route.snapshot.data.poolNumber;
  }

  changeGraph(graphIndex) {
    this.itemIndex = graphIndex + 1;
  }

}
