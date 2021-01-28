import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Md5 } from 'ts-md5/dist/md5';
import { User } from '../interfaces/userInterface';


@Injectable({
  providedIn: 'root'
})

/**Servicio para gestionar lo relacionado a los usuarios (Login, autenticacion, registro.. etc) */
export class DatabaseService {

  private infoEndP = '/user';

  usuarioAutenticado: User;

  @Output()
  cambiosEnUsuario = new EventEmitter<User>(); //Emite los cambios que hay en el usuario, de NO REGISTRADO a REGISTRADO, viceversa.. etc

  constructor( private http: HttpClient) { }

  /**Pâra realizar la peticion de autenticación del usuario, cogiendo la pass codificada en md5 */
  login(nick: string, pass: string): Observable<any> {
    const md5 = new Md5();
    const passMd5 = md5.appendStr(pass).end().toString();

    return this.http.get(this.infoEndP + '?username='+ nick + '&password=' + passMd5).pipe(
      data => {
        return data;
      }
    )
  }

  /**Recoge los datos del usuario autenticado y si ha registrado algún cambio y emite esos cambios */
  getUsuarioAutenticado() : Observable<User> {
    return this.http.get<User>(this.infoEndP + '/' + localStorage.getItem('id')).pipe(
      tap(userAutenticado => {
        if((this.usuarioAutenticado == null && userAutenticado != null) ||
          (this.usuarioAutenticado != null && userAutenticado == null) ||
          (this.usuarioAutenticado != null && userAutenticado == null && this.usuarioAutenticado.idUsuario != userAutenticado.idUsuario)) {
            this.emitirCambiosEnUsuario();
            this.usuarioAutenticado = userAutenticado;
        }
      })
    );
  }

  /**Para emitir los cambios en el usuario */
  emitirCambiosEnUsuario() {
    this.getUsuarioAutenticado().subscribe(userAutenticado => {
      return this.cambiosEnUsuario.emit(userAutenticado);
    })
  }

  /**Recoger usuarios */
  pruebaGetUsers( id: number): Observable<any> {
    return this.http.get(this.infoEndP + `/${id}`);
  }

  /**Recoger todos los usuarios */
  GetAllUsers(): Observable<any> {
    return this.http.get(this.infoEndP + '/all');
  }

  /**Crerar un usuario con la contraseña codificada en md5 para guardarla en la base de datos */
  createUser(user: any): Observable<any>{
    const md5 = new Md5();
    const passMd5 = md5.appendStr(user.password).end().toString();
    user.id = "";
    let json = JSON.stringify(user);
    user.password = passMd5;
    return this.http.post(this.infoEndP, user);
  }

  /**Modifica un usuario según su id */
  modificarUser(user: any): Observable<any>{
    let id = user.id;
    let json = JSON.stringify(user);
    const md5 = new Md5();
    const passMd5 = md5.appendStr(user.password).end().toString();
    user.password = passMd5;
    return this.http.put(this.infoEndP + `/${id}`, user);
  }

  /**Borrar un usuario */
  borrarUser(user: any): Observable<any>{
    let id = user.id;
    return this.http.delete(this.infoEndP + `/${id}`);
  }
}
