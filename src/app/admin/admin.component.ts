import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../shared/database.service';
import * as firebase from 'firebase'
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/auth.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  id: number;
  constructor(private databaseService: DatabaseService,
    private route: ActivatedRoute,
    private authService: AuthService) { }

  ngOnInit() {
    this.authService.currentUser.subscribe(data => console.log(data));
    //this.databaseService.getAll().subscribe(data => console.log(data));
    // this.id = this.route.snapshot.queryParams['id'];
    //this.databaseService.getById(this.id).subscribe(data => console.log(data));
  }
  logOut(){
    this.authService.logOut();
  }
}
