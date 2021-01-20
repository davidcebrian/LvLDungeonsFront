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

export class RegistroComponent implements OnInit {

  registerForm: FormGroup;
  userCreated: User;

  constructor(private build: FormBuilder, private userService: DatabaseService, private router: Router) {
    this.registerForm = this.build.group({
      id:['', Validators.required],
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
      repetir_password: ['', [Validators.required, this.compararPasswords]],
      edad: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  private compararPasswords(control:AbstractControl){
    const password = control.get('password');
    const repetir_password = control.get('repetir_password');

    let error = null;


    //si no coinciden return el error
    if (password != repetir_password) {
        error = {...error, error:'Las contraseñas no coinciden'}
    }

    return error;
  }

  registro(): void{
    this.userCreated.nombre = this.registerForm.controls.nombre.value;
    this.userCreated.edad = this.registerForm.controls.edad.value;
    this.userCreated.email = this.registerForm.controls.email.value;
    this.userCreated.password = this.registerForm.controls.password.value;
    this.userCreated.username = this.registerForm.controls.username.value;

    this.userService.createUser(this.userCreated).subscribe(data => {
      if (data != undefined) {
          this.router.navigate(['/login']);
        }else{
          localStorage.clear();
        }
    })
  }
}
