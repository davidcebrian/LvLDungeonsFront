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


  constructor(private build: FormBuilder, private userService: DatabaseService, private router: Router) {
  }

  ngOnInit(): void {
    this.registerForm = this.build.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required,  Validators.minLength(3)]],
      repetir_password: ['', [Validators.required, this.compararPasswords]],
      edad: ['', Validators.required],
    }, {validator: this.compararPasswords('password', 'repetir_password')})
  }

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

  registro(): void{
    let userCreated: User;

    userCreated = this.registerForm.value;

    this.userService.createUser(userCreated).subscribe(data => {
      if (data != undefined) {
          this.router.navigate(['/login']);
        }else{
          localStorage.clear();
        }
    })
  }
}
