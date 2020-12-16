import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private infoEndP = 'http://172.16.9.55:8080/user';

  constructor( private http: HttpClient) { }

  pruebaGetUsers( id: number): Observable<any> {
    return this.http.get(this.infoEndP + `/${id}`);
  }

  GetAllUsers(): Observable<any> {
    return this.http.get(this.infoEndP + '/all');
  }

  createUser(user: any): Observable<any>{
    user.id = "";
    let json = JSON.stringify(user);
    return this.http.post(this.infoEndP, user);
  }

  modificarUser(user: any): Observable<any>{
    let id = user.id;
    let json = JSON.stringify(user);
    return this.http.put(this.infoEndP + `/${id}`, user);
  }

}
