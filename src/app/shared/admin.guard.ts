import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Role } from './role';

@Injectable({ providedIn: 'root' })
export class RouteGuard implements CanActivate {
  constructor(
    private router: Router,) {}

  canActivate(route: ActivatedRouteSnapshot) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(route.data.roles[0], currentUser.role, route);
    if (route.data.roles[0] === currentUser.role){
        return true;
    }
    this.router.navigate([currentUser.role]);
    return false;
    }
}