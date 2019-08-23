import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin-component/admin.component';
import { AuthGuard } from '../shared/auth.guard';
import { RouteGuard } from '../shared/admin.guard';
import { Role } from '../shared/role';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        canActivate: [AuthGuard, RouteGuard], 
        data: { roles: [Role.Admin] }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule{}