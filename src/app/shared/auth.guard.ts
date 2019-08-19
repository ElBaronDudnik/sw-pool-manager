import {CanActivate} from '@angular/router';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {of} from 'rxjs/observable/of';

export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  canActivate(): Observable<boolean> {
    if (this.authService.loginIn) {
      return Observable.of(true);
    } else {
      return Observable.of(false);
    }
  }
}


