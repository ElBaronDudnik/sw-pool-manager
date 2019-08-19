import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
//import { auth } from 'firebase';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginIn: boolean = true;
  userId = this.afAuth.authState.pipe(map(authState => authState.uid));
  constructor(private afAuth: AngularFireAuth) {}
}
