import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutJwtService } from 'src/app/services/aut-jwt.service';
import { DatabaseService } from 'src/app/services/database.service';
import { ErroresService } from 'src/app/services/errores.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**Pantalla de login */
export class LoginComponent implements OnInit {
  /**Formulario reactivo de login */
  loginForm = new FormGroup({
    usuario: new FormControl('',[Validators.required,  Validators.minLength(3)]),
    password: new FormControl('', [Validators.required,  Validators.minLength(3)])
  })
  /**Boolan para identificar si se muestra o no se muestra la contraseña */
  ocultarPass: boolean = true;

  /**String error y Boolean para error usuario o contraseña incorrecta */
  mensaje:string;
  error:boolean = false;


  constructor(private router: Router, private autJwtService: AutJwtService,
    private dbService: DatabaseService, private errorService: ErroresService) { }

  ngOnInit(): void {
  }

  /**Sirve para autenticar un usuario según los valores introducidos en el formulario
   * Si recibe datos , guarda el jwt en el localStorage y si el jwt no está vacío
   * nos lleva a la siguiente pagina y emite los cambios en el usuario.
   */
  login() {
    this.dbService.login(this.loginForm.controls.usuario.value, this.loginForm.controls.password.value).subscribe(
      data => {
        if(data.mensaje != null){
          this.mensaje = data.mensaje;
          this.error = true;
        }
        else if (data != undefined) {
          this.autJwtService.guardarJwt(data.jwt, data.id);
          if(localStorage.getItem("jwt") != ""){
          this.errorService.LoginCorrecto('/lobby')
          }else{
            localStorage.clear();
          }
        }
      },
      error => {
        if(error != null){
          this.errorService.ErrorInesperado()
        }
      }
    )
  }


}



