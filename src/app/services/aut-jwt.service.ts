import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

/**Servicio para gestionar el token jwt en el fron con localStorage */
export class AutJwtService {

  constructor() { }

  /**Guarda el token en el localStorage */
  guardarJwt(token: string){
    localStorage.setItem("jwt", token);
  }
  /**Recupera el token del localStorage */
  recuperarJwt() {
    return localStorage.getItem("jwt");
  }
  /**Borra el token del localStorage */
  borrarJwt() {
    localStorage.removeItem("jwt");
  }
}
