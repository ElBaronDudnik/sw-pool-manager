import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable({providedIn: 'root'})
export class DatabaseService {
    static url = 'https://sw-pool-manager.firebaseio.com';

    constructor(private http: HttpClient,
                public db: AngularFireDatabase) {}

    getUserById(id) {
        return this.http.get(`${DatabaseService.url}/users/${id}.json`);
    }

    getAlarms() {
        return this.db.database.ref('/alarms');
    }

    getControls() {
      return this.db.database.ref('/control');
    }

    getModeTables() {
      return this.db.database.ref('/modeTables');
    }

    getRelayStatus() {
      return this.db.database.ref('/relayStatus');
    }

    sendTablesData(data) {
      return this.db.database.ref('/modeTables').set(data);
    }

    sendAny(path, data) {
      return this.db.database.ref(path).set(data);
    }

    sendCommand(command) {
      return this.db.database.ref('/command').set(command);
    }
}
