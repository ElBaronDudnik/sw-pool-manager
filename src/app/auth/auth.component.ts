import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from '../shared/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    ) {
      if (this.currentUser) { 
        this.router.navigate(['home'])
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
