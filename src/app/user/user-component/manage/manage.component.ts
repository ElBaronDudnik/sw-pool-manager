import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ModeDialogComponent} from '../mode-dialog/mode-dialog.component';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  color = 'accent';
  checked = false;
  disabled = false;
  modes = ['стандартный', 'отпуск', 'интенсивный', 'пользовательский']
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ModeDialogComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
