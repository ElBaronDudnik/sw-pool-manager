import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  static url = 'https://sw-pool-manager.firebaseio.com/pools';
  constructor(private http: HttpClient) {}
}
