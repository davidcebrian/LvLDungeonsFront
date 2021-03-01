import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { DatabaseService } from '../../services/database.service';
import { User } from '../../interfaces/userInterface';
import { Router } from '@angular/router';
import { ErroresService } from '../../services/errores.service';


@Component({
  selector: 'app-detalles-usuario',
  templateUrl: './detalles-usuario.component.html',
  styleUrls: ['./detalles-usuario.component.css']
})
export class DetallesUsuarioComponent implements OnInit {

  /**Declaracion del formulario */
  Form: FormGroup;
  /*Utilizo un objeto de tipo Usuario, para cargar los valores del usuario autenticado y para recoger los valores de los campos del formulario*/
  usuario: User = null;
  /**Boolean para identificar si se muestra o no se muestra la contraseña */
  ocultarPass: boolean=true;
  ocultarPassRep: boolean=true;
  /**mensajes y control de errores */
  mensaje:string;
  error:boolean = false;

  constructor(private build: FormBuilder, private userService: DatabaseService, private router: Router,
    private errorService: ErroresService) { }

  ngOnInit(): void {
    
  this.cargarDatosUsuarioAutenticado();
    
   /**Inicialización de formulario*/
   this.Form = this.build.group({
    nombre: ['', Validators.required],
    edad: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required,  Validators.minLength(3)]],
    repetir_password: ['', [Validators.required]],
  },{validator: this.compararPasswords('password', 'repetir_password')})

  }


  // Este método llama al servicio de usuarios, le pide obtener el usuario autenticado y pone sus datos en pantalla.
  cargarDatosUsuarioAutenticado() {
    this.userService.getUsuarioAutenticado().subscribe(usuario => {
      // Cuando obtengo los datos, los muestro en los controles del formulario.
      this.usuario = usuario; 
      this.Form.controls.username.setValue(this.usuario.username);
      this.Form.controls.edad.setValue(this.usuario.edad);
      this.Form.controls.email.setValue(this.usuario.email);
      this.Form.controls.nombre.setValue(this.usuario.nombre);
    });
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
  
actualizarDatos(){

   // Leo los valores de los controles del formulario y los introduzco en this.usuario
   this.usuario.nombre = this.Form.controls.nombre.value;
   this.usuario.edad = this.Form.controls.edad.value;
   this.usuario.email = this.Form.controls.email.value;
   this.usuario.username = this.Form.controls.username.value;
   this.usuario.password = this.Form.controls.password.value;

  this.userService.modificarUser(this.usuario).subscribe(resul =>{
    if(resul.mensaje != null){
      this.mensaje = resul.mensaje;
      this.error= true;
    }
    else if (resul != undefined){
      this.errorService.ActualizacionDatosCorrecta()//Muestra información con SweetAlert
    }
  },
  error => {
    if(error != null){
      this.errorService.ErrorPersonalizado(this.mensaje)
    }
  }
  );
}

volver(){
  this.router.navigate(['lobby']);
}

eliminar(){
  this.userService.borrarUser(this.usuario).subscribe(resul =>{
    if(resul.mensaje != null){
      this.mensaje = resul.mensaje;
      this.error= true;
    }
    else if (resul != undefined){
      this.errorService.EliminacionUserCorrecta()//Muestra información con SweetAlert
    }
  },
  error => {
    if(error != null){
      this.errorService.ErrorInesperado()
    }
  }
  );
  this.router.navigate(['inicio']);
}
}