import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutJwtService } from 'src/app/services/aut-jwt.service'
import { DatabaseService } from 'src/app/services/database.service'


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

  constructor(private router: Router, private autJwtService: AutJwtService,
    private dbService: DatabaseService) { }

  ngOnInit(): void {
  }

  /**Sirve para autenticar un usuario según los valores introducidos en el formulario
   * Si recibe datos , guarda el jwt en el localStorage y si el jwt no está vacío
   * nos lleva a la siguiente pagina y emite los cambios en el usuario.
   */
  login() {
    this.dbService.login(this.loginForm.controls.usuario.value, this.loginForm.controls.password.value).subscribe(
      data => {
        if (data != undefined) {
          this.autJwtService.guardarJwt(JSON.parse(data).jwt);
          if(localStorage.getItem("jwt") != ""){
            this.router.navigate(['/detalles']);
            this.dbService.emitirCambiosEnUsuario();
          }else{
            localStorage.clear();
          }
        }
      }
    )
  }
}



