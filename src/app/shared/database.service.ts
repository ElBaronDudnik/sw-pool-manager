import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({providedIn: 'root'})
export class DatabaseService {
    static url = 'https://sw-pool-manager.firebaseio.com';

    constructor(private http: HttpClient,
                public db: AngularFirestore) {}

    getUserById(id) {
        return this.http.get(`${DatabaseService.url}/users/${id}.json`);
    }

    getAlarms() {
        // return this.http.get(`${DatabaseService.url}/alarms.json`);
        // return this.db.collection('/alarms').get();
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

    sendTablesData(data) {
      console.log(data);
      // return firebase.database().ref(`modeTables`).set({
      //   standart: data[0].value,
      //   vacation: data[1].value,
      //   intensive: data[2].value,
      //   user: data[3].value
      // });
      // return this.http.post(`${DatabaseService.url}/modeTables.json`, JSON.stringify(data));
    }
}
