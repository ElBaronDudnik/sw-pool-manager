import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VERSION } from '../app.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  public form: FormGroup;
  public errors = false;
  public version = VERSION;
  public currentUser = localStorage.getItem('currentUser');
  constructor(
    private authService: AuthService,
    private router: Router,
    ) {
      if (this.currentUser) {
        this.router.navigate(['home']);
      }
    }

  ngOnInit() {
    this.form = new FormGroup({
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  login(): void {
    if (this.form.valid) {
     this.authService.authorization(this.form.value.login, this.form.value.password).then(data => {
       if (data === 'error') {
         this.errors = true;
       }
     });
    }
  }

}
