import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/userInterface';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  usuarioAutenticado: User;

  searchForm: FormGroup;
  constructor( private build: FormBuilder, private dbService: DatabaseService, private router: Router) { 

    this.searchForm = this.build.group({
      input: ['']
    })
    
  }

  ngOnInit(): void {
    this.dbService.cambiosEnUsuario.subscribe( nuevoUser => {
      this.usuarioAutenticado = nuevoUser;
    })
  }

  desLogear(){
    this.usuarioAutenticado = null;
    this.dbService.logout();
    localStorage.clear();
    this.router.navigate(['login']);
  }

}
