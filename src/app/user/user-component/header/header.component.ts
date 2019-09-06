import { Component, Input, Output, EventEmitter, HostListener, ElementRef, OnInit } from '@angular/core';
import { User } from 'src/app/shared/user';

@Component({
    selector: 'app-user-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
    @Input() user;
    active = false;
    @Output() logOut = new EventEmitter();
    @Output() opened = new EventEmitter<any>();

    ngOnInit() {
        console.log(this.user);
    }
    onLogOut() {
        this.logOut.emit();
    }

    onBurgerClicked() {
      this.active = !this.active;
      this.opened.emit();
    }
}
