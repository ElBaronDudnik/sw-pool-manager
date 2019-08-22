import { Component, OnInit, OnChanges } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { User } from '../shared/user';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  id: number;
  currentUser: User;
  constructor(
    private authService: AuthService) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
  logOut(){
    this.authService.logOut();
  }
}
