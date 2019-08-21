import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class DatabaseService {
    static url = 'https://sw-pool-manager.firebaseio.com/users'
    constructor(private http: HttpClient){}
    getAll() {
        return this.http.get(`${DatabaseService.url}.json`);
    }
    getById(id) {
        console.log(id)
        return this.http.get(`${DatabaseService.url}/${id}.json`);
    }
}