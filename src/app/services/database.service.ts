import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private infoEndP = 'http://172.16.9.55:8080/test';

  constructor( private http: HttpClient) { }

  pruebaGetUsers(): Observable<any> {
    return this.http.get(this.infoEndP + '/users');
  }

}
