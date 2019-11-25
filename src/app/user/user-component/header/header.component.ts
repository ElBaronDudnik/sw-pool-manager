import {Component, Input, Output, EventEmitter, OnInit, ChangeDetectorRef} from '@angular/core';
import { VERSION } from '../../../app.component';
import {DatabaseService} from '../../../shared/database.service';

@Component({
    selector: 'app-user-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    public active = false;
    public version = VERSION;
    public isDeviceReady: boolean;
    @Input() user;
    @Output() logOut = new EventEmitter();
    @Output() opened = new EventEmitter<any>();

    constructor(private databaseService: DatabaseService,
                private cdr: ChangeDetectorRef) {}

    ngOnInit() {
      this.databaseService.getReadyStatus().on('value', snapshot => {
        this.isDeviceReady = !!snapshot.val();
        this.cdr.detectChanges();
      });
    }

    onLogOut(): void {
        this.logOut.emit();
    }

    onBurgerClicked(): void {
      this.active = !this.active;
      this.opened.emit();
    }

    closeMenu() {
      this.active = false;
    }

    ngDestroy() {
      console.log('destroy');
    }
}
