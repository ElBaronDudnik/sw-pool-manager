import { NgModule } from "@angular/core";
import { AdminComponent } from './admin-component/admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MatButtonModule } from '@angular/material/button'

@NgModule({
    imports: [
        AdminRoutingModule,
        MatButtonModule,
    ],
    declarations: [
        AdminComponent
    ]
})
export class AdminModule{}