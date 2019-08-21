import { Component, OnInit } from '@angular/core';
import {AuthService} from '../shared/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../shared/database.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  form: FormGroup;
  currentUser = localStorage.getItem('currentUser');
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private databaseService: DatabaseService
    ) {
      //console.log(this.currentUser)
      if (this.currentUser) { 
        //console.log(this.currentUser)
        this.router.navigate(['/admin']);
      }
    }

  ngOnInit() {
    this.form = new FormGroup({
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
  login() {
    if (this.form.valid) {
      this.authService.authorization(this.form.value.login, this.form.value.password);
    }
  }

}
