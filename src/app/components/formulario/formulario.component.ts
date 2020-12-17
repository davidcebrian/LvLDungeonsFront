import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DatabaseService } from '../../services/database.service';
import { User } from '../../interfaces/userInterface';

@Component({
  selector: 'formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

registerForm: FormGroup;


  constructor( private build: FormBuilder, private userService: DatabaseService) { 
    
    this.registerForm = this.build.group({
      id:['', Validators.required],
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      nick: ['', Validators.required],
      pass: ['', Validators.required], 
      edad: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  createUser(): void{
    let userCreated: User;
    userCreated = this.registerForm.value;
    this.userService.createUser(this.registerForm.value).subscribe(response => {
      console.log(response);
    })
  }

  modificarUser(): void{
    let userCreated: User;
    userCreated = this.registerForm.value;
    this.userService.modificarUser(this.registerForm.value).subscribe(response => {
      console.log(response);
    })
  }

  borrarUser(): void{
    let userCreated: User;
    userCreated = this.registerForm.value;
    this.userService.borrarUser(this.registerForm.value).subscribe(response => {
      console.log(response);
    })
  }
}
