import { Component, OnInit } from '@angular/core';
import {AuthService} from '../shared/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  form: FormGroup;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.form = new FormGroup({
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
    console.log(this.authService.state);
  }
  login() {
    if (this.form.valid) {
      this.authService.authorization(this.form.value.login, this.form.value.password);
    }
  }

}
