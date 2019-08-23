import { Component, Input, Output, EventEmitter } from "@angular/core";
import { User } from 'src/app/shared/user';

@Component({
    selector: 'app-user-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    @Input() user;
    @Output() logOut = new EventEmitter();
    ngOnInit(){
        console.log(this.user);
    }
    onLogOut(){
        this.logOut.emit();
    }
}