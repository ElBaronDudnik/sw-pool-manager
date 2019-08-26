import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user-component/user.component';
import { AuthGuard } from '../shared/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: UserComponent,
        canActivate: [AuthGuard], 
        data: {poolNumber: 1}
    },
    {
        path: 'second',
        component: UserComponent,
        canActivate: [AuthGuard],
        data: {poolNumber: 2}
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class UserRoutingModule{}