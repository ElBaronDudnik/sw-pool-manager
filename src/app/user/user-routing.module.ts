import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user-component/user.component';
import { Role } from '../shared/role';
import { RouteGuard } from '../shared/admin.guard';
import { AuthGuard } from '../shared/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: UserComponent,
        canActivate: [AuthGuard, RouteGuard], 
        data: { roles: [Role.User] }
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class UserRoutingModule{}