import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {delay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  static url = 'https://api.thingspeak.com';
  static API_KEY = 'AYG4CFZPWNQ0TI3J'
  constructor(private http: HttpClient) {}

  getInfo(channel: number) {
    return this.http
      .get(`${ApiService.url}/channels/${channel}/feeds.json?results=2`);
  }
  getManaging() {
    return this.http
      .get(`${ApiService.url}/channels/848346/feeds.json?results=2`);
  }
  getSensors() {
    return this.http
      .get(`${ApiService.url}/channels/848347/feeds.json?results=2`);
  }
  sendCommand(param) {
    console.log(param)
    return this.http.get(`${ApiService.url}/update?api_key=${ApiService.API_KEY}&field1=${param}`);
  }
  readFromAdmin(results) {
    console.log(results);
    return this.http.get(`${ApiService.url}/channels/860835/feeds.json?results=${results}`);
  }
  temperatureTake() {
    return this.http.get(`${ApiService.url}/channels/848348/feeds.json?results=1`);
  }
  readResponse() {
    return this.http.get(`${ApiService.url}/channels/848349/feeds.json?results=1`);
  }
  sendTable(param) {
    return this.http.get(`${ApiService.url}/update?api_key=09HCRDBIEA05JNHD&field1=${param}`);
  }
  readModeTables(results) {
    return this.http.get(`${ApiService.url}/channels/267003/feeds.json?results=${results}`);
  }

}
