import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  state: boolean;
  public currentUserSubject: BehaviorSubject<User>;
  constructor(
    private router: Router,
    private databaseService: DatabaseService
    ) {
    this.currentUserSubject = new BehaviorSubject<User>(new User());
  }

  async  authorization(emailAddress: string, password: string): Promise<string> {

    try {
      const res = await  firebase.auth().signInWithEmailAndPassword(emailAddress, password)
      const { displayName, email, uid } = res.user;
      this.getUserFromDatabase({displayName, email, uid});
    } catch (e) {
      return 'error';
    }
  }

  get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  getUserFromDatabase({...arg}): void {
    this.databaseService.getById(arg.uid).subscribe(obtainedData => {
      this.currentUserSubject.next({
        username: obtainedData['name'],
        email: arg.email,
        token: arg.uid,
        pools: obtainedData['pools'],
        role: obtainedData['role'],
      });

      localStorage.setItem('currentUser', JSON.stringify(this.currentUserSubject.value));
      this.goUserPage();
    });
  }

  logOut() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['auth']);
  }

  goUserPage() {
    this.router.navigate(['home/first']);
  }
}
