import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/userInterface';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss']
})
export class DetallesComponent implements OnInit {

  usuarioAutenticado: User;

  constructor(private router:Router, 
              private dbService: DatabaseService) { }

  ngOnInit(): void {
    this.dbService.cambiosEnUsuario.subscribe( nuevoUser => {
      this.usuarioAutenticado = nuevoUser;
    })
    if(this.compruebaJwt && this.usuarioAutenticado == null){
      this.dbService.getUsuarioAutenticado().subscribe(usuario => {
        this.usuarioAutenticado = usuario;
      });
    }
  }

  compruebaJwt():boolean{
    if(localStorage.getItem("jwt")!=null) return true;
    else return false;
  }

}
