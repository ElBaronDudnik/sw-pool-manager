import { NgModule } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';

import { UserComponent } from './user-component/user.component';
import { UserRoutingModule } from './user-routing.module';
import { HeaderComponent } from './user-component/header/header.component';
import { GraphComponent } from './user-component/graph/graph.component';
import { ChannelInfoComponent } from './user-component/channels-info/channel-info.component';

import { SafePipe } from '../shared/safe.pipe';
import { CommonModule } from '@angular/common';
import { ManageComponent } from './user-component/manage/manage.component';
import { ChannelComponent } from './user-component/channel/channel.component';


@NgModule({
    imports: [
        CommonModule,
        UserRoutingModule,
        MatButtonModule,
        MatListModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSlideToggleModule,
        MatSelectModule,
    ],
    declarations: [
        UserComponent,
        HeaderComponent,
        GraphComponent,
        SafePipe,
        ChannelInfoComponent,
        ManageComponent,
        ChannelComponent,
    ]
})
export class UserModule{
}