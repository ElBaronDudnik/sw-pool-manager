import { NgModule } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

import { UserComponent } from './user-component/user.component';
import { UserRoutingModule } from './user-routing.module';
import { HeaderComponent } from './user-component/header/header.component';
import { GraphComponent } from './user-component/graph/graph.component';
import { ChannelInfoComponent } from './user-component/channels-info/channel-info.component';

import { SafePipe } from '../shared/safe.pipe';
import { CommonModule } from '@angular/common';


@NgModule({
    imports: [
        CommonModule,
        UserRoutingModule,
        MatButtonModule,
        MatListModule,
        MatCardModule,
    ],
    declarations: [
        UserComponent,
        HeaderComponent,
        GraphComponent,
        SafePipe,
        ChannelInfoComponent,
    ]
})
export class UserModule{
}