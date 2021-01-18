import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Md5 } from 'ts-md5/dist/md5';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private infoEndP = '/user';

  constructor( private http: HttpClient) { }

  login(nick: string, pass: string): Observable<string> {
    const md5 = new Md5();

    const passMd5 = md5.appendStr(pass).end().toString();

    return this.http.get(this.infoEndP + '?username='+ nick + '&password=' + passMd5,
     {responseType: 'text'}).pipe(
       data => {
         return data;
       }
     )
  }


  pruebaGetUsers( id: number): Observable<any> {
    return this.http.get(this.infoEndP + `/${id}`);
  }

  GetAllUsers(): Observable<any> {
    return this.http.get(this.infoEndP + '/all');
  }

  createUser(user: any): Observable<any>{
    const md5 = new Md5();
    const passMd5 = md5.appendStr(user.password).end().toString();
    user.id = "";
    let json = JSON.stringify(user);
    user.password = passMd5;
    return this.http.post(this.infoEndP, user);
  }

  modificarUser(user: any): Observable<any>{
    let id = user.id;
    let json = JSON.stringify(user);
    const md5 = new Md5();
    const passMd5 = md5.appendStr(user.password).end().toString();
    user.password = passMd5;
    return this.http.put(this.infoEndP + `/${id}`, user);
  }

  borrarUser(user: any): Observable<any>{
    let id = user.id;
    return this.http.delete(this.infoEndP + `/${id}`);
  }
}
