import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';
import { Role } from './role';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginIn = true;
  state: boolean;
  public currentUserSubject: BehaviorSubject<User>;
  constructor(
    private router: Router,
    private databaseService: DatabaseService
    ) {
    this.currentUserSubject = new BehaviorSubject<User>(new User());
  }
  authorization(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((res) => {
        const { displayName, email, uid } = res.user;
        this.getUserFromDatabase({displayName, email, uid});
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
    });
  }
  get currentUserValue() {
    return this.currentUserSubject.value;
  }

  getUserFromDatabase({...arg}) {
    this.databaseService.getById(arg.uid).subscribe(obtainedData => {
      this.currentUserSubject.next({
        username: obtainedData['name'],
        email: arg.email,
        token: arg.uid,
        pools: obtainedData['pools'],
        role: obtainedData['role'],
      });
      localStorage.setItem('currentUser', JSON.stringify(this.currentUserSubject.value));
      if (this.currentUserSubject.value.role === Role["User"]){
        this.goUserPage();
      } else {
        this.goAdminPage();
      }
    });
  }
  logOut() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['auth']);
  }
  goUserPage() {
    this.router.navigate(['home/firts']);
  }
  goAdminPage() {
    this.router.navigate(['home']);
  }
  changeState() {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user)
  })}
}
