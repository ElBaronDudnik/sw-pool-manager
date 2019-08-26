import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { User } from '../../shared/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  currentUser: User;
  itemIndex = 1;
  results = 200;
  poolsIndex = 1;
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute) { }
  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.poolsIndex = this.route.snapshot.data.poolNumber;
  }
  logOut() {
    this.authService.logOut();
  }
  changeGraph(graphIndex) {
    this.itemIndex = graphIndex + 1;
  }
}