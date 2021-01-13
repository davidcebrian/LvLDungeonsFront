import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutJwtService {

  constructor() { }


  guardarJwt(token: string){
    localStorage.setItem("jwt", token);
  }

  recuperarJwt() {
    return localStorage.getItem("jwt");
  }

  borrarJwt() {
    localStorage.removeItem("jwt");
  }
}
