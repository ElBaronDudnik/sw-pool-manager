import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthGuard } from './shared/auth.guard';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { MainComponent } from './main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
  {path: '', redirectTo: 'swApp', pathMatch: 'full'},
  {path: 'swApp', component: AppComponent, children: [
      {path: 'auth', component: AuthComponent},
      {path: 'main', component: MainComponent, canActivate: [AuthGuard]},
      {path: '', component: AuthComponent}
    ]}
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

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule, // auth
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
