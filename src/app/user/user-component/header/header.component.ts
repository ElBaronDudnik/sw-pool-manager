import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { VERSION } from '../../../app.component';

@Component({
    selector: 'app-user-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    public active = false;
    public version = VERSION;
    @Input() user;
    @Output() logOut = new EventEmitter();
    @Output() opened = new EventEmitter<any>();

    onLogOut(): void {
        this.logOut.emit();
    }

    onBurgerClicked(): void {
      this.active = !this.active;
      this.opened.emit();
    }
}
