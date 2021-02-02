import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

//servicio que sirve para cambiar valores a la hora de mostrar o no mostrar infos o errores
export class ErroresService {

  mostrarError: boolean = false; //para mostrar error
  mostrarInfo: boolean = false; //para mostrar info

  showError(){
    this.mostrarError = !this.mostrarError;
  }

  showInfo(){
    this.mostrarInfo = !this.mostrarInfo;
  }

  
  constructor() { }
}
