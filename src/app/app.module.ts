import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthGuard } from './shared/auth.guard';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button'

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { AdminComponent } from './admin/admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserComponent } from './user/user.component';
import { Role } from './shared/role';
import * as firebase from 'firebase';

const routes: Routes = [
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  {path: 'auth', component: AuthComponent},
  {path: 'user', component: UserComponent, canActivate: [AuthGuard], data: { roles: [Role.User] }},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { roles: [Role.Admin] }},
  {path: '**', redirectTo: ''}
];

const firebaseConfig = {
  apiKey: 'AIzaSyCLNnJItXWuXxJeqnr-aqwXeIhozOGza2Q',
  authDomain: 'sw-pool-manager.firebaseapp.com',
  databaseURL: 'https://sw-pool-manager.firebaseio.com',
  projectId: 'sw-pool-manager',
  storageBucket: '',
  messagingSenderId: '170998076356',
  appId: '1:170998076356:web:4fb3e1f9e5549387'
};

firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    AdminComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
