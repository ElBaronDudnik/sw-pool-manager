import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  static url = 'https://api.thingspeak.com';
  static API_KEY = 'AYG4CFZPWNQ0TI3J'
  constructor(private http: HttpClient) {}

  getInfo(channel: number) {
    return this.http
      .get(`${ApiService.url}/channels/${channel}/feeds.json?results=1`);
  }
  getManaging() {
    return this.http
      .get(`${ApiService.url}/channels/848346/feeds.json?results=1`);
  }
  getSensors() {
    return this.http
      .get(`${ApiService.url}/channels/848347/feeds.json?results=1`);
  }
  sendCommand(param) {
    console.log(param)
    return this.http.get(`${ApiService.url}/update?api_key=${ApiService.API_KEY}&field1=${param}`);
  }
}

