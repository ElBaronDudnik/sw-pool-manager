import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class DatabaseService {
    static url = 'https://sw-pool-manager.firebaseio.com'
    constructor(private http: HttpClient){}
    
    getUserById(id) {
        return this.http.get(`${DatabaseService.url}/users/${id}.json`);
    }

    getAlarms() {
        return this.http.get(`${DatabaseService.url}/alarms.json`);
    }

    getControls() {
        return this.http.get(`${DatabaseService.url}/controls.json`)
    }

    getModeTables() {
        return this.http.get(`${DatabaseService.url}/modeTables.json`);
    }

    getRelayStatus() {
        return this.http.get(`${DatabaseService.url}/relayStatus.json`);
    }
}