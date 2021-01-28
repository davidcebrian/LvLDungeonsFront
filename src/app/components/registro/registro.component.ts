import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { DatabaseService } from '../../services/database.service';
import { User } from '../../interfaces/userInterface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
/**Pantalla de registro */
export class RegistroComponent implements OnInit {

  /**Declaracion del formulario */
  registerForm: FormGroup;
  /**Boolean para identificar si se muestra o no se muestra la contraseña */
  ocultarPass: boolean=true;
  ocultarPassRep: boolean=true;
  /**mensajes y control de rrores */
  mensaje:string;
  error:boolean = false;

  constructor(private build: FormBuilder, private userService: DatabaseService, private router: Router) {
  }

  ngOnInit(): void {
    /**Inicialización de formulario reactivo de registro */
    this.registerForm = this.build.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required,  Validators.minLength(3)]],
      repetir_password: ['', [Validators.required, this.compararPasswords]],
      edad: ['', Validators.required],
    }, {validator: this.compararPasswords('password', 'repetir_password')})
  }

  /**Método privado para comprobar que ambas contraseñas coinciden */
  private compararPasswords(control: string, control2: string){
    return(formGroup: FormGroup) =>{
      const password = formGroup.controls[control];
      const repetir_password = formGroup.controls[control2];
      
      if(!password || !repetir_password) return null

      if(repetir_password.errors && !repetir_password.errors.passwordMismatch) return null

      if(password.value !== repetir_password.value){
        repetir_password.setErrors({passwordMismatch: true});
      } else {
        repetir_password.setErrors(null);
      }
    }
  }

  /**Sirve para crear  un usuario según los valores introducidos en el formulario, siempre y cuando 
   * estos sean válidos y el nickname y el correo no estén ya registrados en el sistema.
   */
  registro(): void{
    let userCreated: User;

    userCreated = this.registerForm.value;

    this.userService.createUser(userCreated).subscribe(data => {
      if(data.mensaje != null){
        this.mensaje = data.mensaje;
        this.error = true;
      }
      else if (data != undefined) {
          this.router.navigate(['/login']);
        }else{
          localStorage.clear();
        }
    })
  }
}
