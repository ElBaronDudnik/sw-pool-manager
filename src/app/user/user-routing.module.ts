import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { ChannelComponent } from './user-component/channel/channel.component';
import { AuthGuard } from '../shared/auth.guard';
import { ManageComponent } from './user-component/manage/manage.component';
import {UserComponent} from './user-component/user.component';
import {ModeConfigurationComponent} from './user-component/mode-configuration/mode-configuration.component';
import {SignalsComponent} from './user-component/signals/signals.component';

const routes: Routes = [
    {
      path: '',
      component: UserComponent,
      canActivate: [AuthGuard],
      children: [
        {
          path: '',
          redirectTo: 'first',
          pathMatch: 'full'
        },
        {
          path: 'first',
          component: ChannelComponent,
          canActivate: [AuthGuard],
          data: {poolNumber: 1}
        },
        {
          path: 'second',
          component: ChannelComponent,
          canActivate: [AuthGuard],
          data: {poolNumber: 2}
        },
        {
          path: 'managing',
          component: ManageComponent,
          canActivate: [AuthGuard],
        },
        {
          path: 'configuration',
          component: ModeConfigurationComponent,
          canActivate: [AuthGuard],
        },
        {
          path: 'signals',
          component: SignalsComponent,
          canActivate: [AuthGuard],
        },
      ]
    },
    {path: '**', redirectTo: 'first'},
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class UserRoutingModule{}
