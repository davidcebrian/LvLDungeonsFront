import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

//servicio que sirve para cambiar valores a la hora de mostrar o no mostrar infos o errores
export class ErroresService {

  mostrarError: boolean = false;
  mostrarInfo: boolean = false;

  showError(){
    this.mostrarError = !this.mostrarError;
  }

  showInfo(){
    this.mostrarInfo = !this.mostrarInfo;
  }

  
  constructor() { }
}
