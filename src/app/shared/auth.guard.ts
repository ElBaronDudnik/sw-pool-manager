import {CanActivate} from '@angular/router';
import {AuthService} from './auth.service';

export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  canActivate(): boolean {
    if (this.authService.loginIn) {
      return true;
    } else {
      return false;
    }
  }
}


