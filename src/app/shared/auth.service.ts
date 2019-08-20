import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginIn = true;
  state: boolean;
  // userId = this.afAuth.authState.pipe(map(authState => authState.uid));
  constructor(private authFire: AngularFireAuth, private router: Router) {}
  authorization(email, password) {
    console.log('Hello')
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log(res);
        this.router.navigate(['swApp/main']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
    });
  }

  changeState() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const { displayName, email, emailVerified, uid } = user;
        this.state = true;
      } else {
        console.log('No users logining');
        this.state = false;
      }
    });
  }

}
