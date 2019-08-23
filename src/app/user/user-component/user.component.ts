import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { User } from '../../shared/user';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  currentUser: User;
  constructor(
    private authService: AuthService,
    private apiService: ApiService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
  }
  
  logOut() {
    this.authService.logOut();
  }

}