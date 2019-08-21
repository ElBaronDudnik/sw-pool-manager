import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from './user';
import { Role } from './role';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginIn = true;
  state: boolean;
  private currentUserSubject: Subject<User> = new Subject;
  public currentUser: Observable<User>;

  // userId = this.afAuth.authState.pipe(map(authState => authState.uid));
  constructor(
    private router: Router,
    private databaseService: DatabaseService
    ) {
    // this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    // this.currentUser = this.currentUserSubject.asObservable();
  }
  authorization(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((res) => {
        const { displayName, email, uid } = res.user;
        console.log(uid);
        this.databaseService.getById(uid).subscribe(obtainedData => {
          console.log(obtainedData);
          this.currentUserSubject.next({
            username: displayName,
            email: email,
            token: uid,
            poolId: obtainedData['poolId'],
            role: obtainedData['role'],
          });
          this.currentUser = this.currentUserSubject.asObservable();
          localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
          console.log(this.currentUser, this.currentUserSubject)
          // if (this.currentUserSubject == Role[0]){
          //   this.goUserPage();
          // } else {
          //   this.goAdminPage();
          // }
        });
      
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
    });
  }
  logOut() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['auth']);
  }
  goUserPage() {
    this.router.navigate(['user']);
  }
  goAdminPage() {
    this.router.navigate(['admin']);
  }
  changeState() {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user)
    })}
}
