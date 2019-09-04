import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { User } from 'firebase';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {
  currentUser: User;
  itemIndex = 1;
  results = 200;
  poolsIndex = 1;
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.poolsIndex = this.route.snapshot.data.poolNumber;
  }
  changeGraph(graphIndex) {
     this.itemIndex = graphIndex + 1;
  }
}
