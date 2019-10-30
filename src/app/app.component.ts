import { Component } from '@angular/core';


export const VERSION = new Date().toLocaleString();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sw-pool-manager';
}
