import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button'

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as firebase from 'firebase';
import { AppRoutingModule } from './app-rounting.module';

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
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
