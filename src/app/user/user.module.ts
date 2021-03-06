import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';

import { UserComponent } from './user-component/user.component';
import { UserRoutingModule } from './user-routing.module';
import { HeaderComponent } from './user-component/header/header.component';
import { GraphComponent } from './user-component/graph/graph.component';
import { ChannelInfoComponent } from './user-component/channels-info/channel-info.component';

import { SafePipe } from '../shared/safe.pipe';
import { CommonModule } from '@angular/common';
import { ManageComponent } from './user-component/manage/manage.component';
import { ChannelComponent } from './user-component/channel/channel.component';
import { ModeDialogComponent } from './user-component/mode-dialog/mode-dialog.component';
import { ModeConfigurationComponent } from './user-component/mode-configuration/mode-configuration.component';
import {DayOfWeekPipe} from '../shared/dayOfWeek.pipe';
import {StatePipe} from '../shared/state.pipe';
import {MinutesPipe} from '../shared/minutes.pipe';
import {ContentEditableDirective} from '../shared/contenteditable.directive';
import { ResponseInterceptor} from '../shared/response.interseptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {ApiService} from '../shared/api.service';
import {AuthGuard} from '../shared/auth.guard';
import {DataService} from '../shared/data.service';
import {ContenteditableModule} from '@ng-stack/contenteditable';
import { MatProgressBarModule } from '@angular/material';
import { SignalsComponent } from './user-component/signals/signals.component';
import { GraphOptionsComponent } from './user-component/graph-options/graph-options.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        UserRoutingModule,
        MatButtonModule,
        MatListModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSlideToggleModule,
        MatSelectModule,
        MatDialogModule,
        MatTableModule,
        MatProgressBarModule,
        ReactiveFormsModule,
        ContenteditableModule,
    ],
    declarations: [
        UserComponent,
        HeaderComponent,
        GraphComponent,
        SafePipe,
        ChannelInfoComponent,
        ManageComponent,
        ChannelComponent,
        ModeDialogComponent,
        ModeConfigurationComponent,
        DayOfWeekPipe,
        StatePipe,
        MinutesPipe,
        ContentEditableDirective,
        SignalsComponent,
        GraphOptionsComponent,
    ],
    providers: [
      AuthGuard,
      ApiService,
      DataService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: ResponseInterceptor,
        multi: true
      },
    ],
    entryComponents: [ModeDialogComponent]
})
export class UserModule {
}
