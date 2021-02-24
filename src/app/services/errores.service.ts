import { Injectable } from '@angular/core';
import { RouteConfigLoadEnd } from '@angular/router';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})


//servicio que sirve para cambiar valores a la hora de mostrar o no mostrar infos o errores
export class ErroresService {
  
  constructor(private router: Router) { }


  //modal errors
  ErrorInesperado(): any{
  Swal.fire({
    title: 'ERROR!',
    text: 'Ha ocurrido algo inesperado!',
    icon: 'error',
    confirmButtonText: 'OK'
  })
}

ErrorPersonalizado(msg: string): any{
  Swal.fire({
    title: 'ERROR!',
    text: msg,
    icon: 'error',
    confirmButtonText: 'OK'
  })
}

  RegistroCorrecto(ruta: String): any{
    Swal.fire({
      title: 'INFO!',
      text: 'Registro completo. ¿Desea ir a log in?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: '¡Si!',
      denyButtonText: 'No',
    }).then(result => {
      if(result.isConfirmed){
        this.router.navigate([ruta]);
      }
    })
  }

  LoginCorrecto(ruta: String): any{
    Swal.fire({
      title: '¡Log correcto!.',
      text: 'Entrando a página principal.',
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => { Swal.showLoading() },
      willClose: () => {
        this.router.navigate([ruta]);
      }
    }).then(result => {
      if(result.dismiss === Swal.DismissReason.timer){
        this.router.navigate([ruta]);
      }
    })
  }


  
}
