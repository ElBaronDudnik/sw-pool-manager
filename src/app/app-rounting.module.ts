import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
    {path: '', redirectTo: 'auth', pathMatch: 'full'},
    {path: 'auth', component: AuthComponent},
    {path: 'user', 
        loadChildren: () => import('./user/user.module').then(mod => mod.UserModule)},
    {path: 'admin', 
        loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule)},
    {path: '**', redirectTo: ''}
  ];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule{}