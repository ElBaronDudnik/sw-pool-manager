import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-mode-dialog',
  templateUrl: './mode-dialog.component.html',
  styleUrls: ['./mode-dialog.component.css']
})
export class ModeDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModeDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
