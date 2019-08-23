import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  static url = 'https://api.thingspeak.com/channels';
  constructor(private http: HttpClient) {}

  getInfo(channel: number) {
    return this.http
      .get(`${ApiService.url}/${channel}/feeds.json?results=1`);
      
  }
}
