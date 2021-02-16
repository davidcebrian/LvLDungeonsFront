import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonajePartida, User } from 'src/app/interfaces/userInterface';
import { DatabaseService } from 'src/app/services/database.service';
import { PartidaServiceService } from 'src/app/services/partida-service.service';
import { WebSocketAPI } from 'src/app/services/ws/web-socket-api.service';
import { Partida } from '../../interfaces/userInterface';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss']
})
export class DetallesComponent implements OnInit {

  usuarioAutenticado: User;
  
  partida: Partida = null;
  webSocketApi: WebSocketAPI;
  formPartida: FormGroup;
  
  constructor(private router:Router, 
              private dbService: DatabaseService,
              
              private partidaService: PartidaServiceService,
              private webSocket: WebSocketAPI,
              private build: FormBuilder
              ) { 
              
              
                this.formPartida = this.build.group({
                token: [''],
                })
                
              }



  /**Recoge los cambios cuando se identifica un usuario o se desconecta el mismo y lo guarda */
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
  /**Para comprobar que existe el jwt del usuario que este autenticado */
  compruebaJwt():boolean{
    if(localStorage.getItem("jwt")!=null) return true;
    else return false;
  }


  crearPartida():void {
    this.partidaService.iniciarPartidaVoid().subscribe(res => {
      console.log(res);
    this.partida = res;
    console.log(this.partida.token);
    this.webSocket._connect(this.partida.token);
    this.partida = this.webSocket.partida;
    })
  }

  unirsePartida( ):void {
    this.partidaService.iniciarPartidaToken( this.formPartida.controls.token.value ).subscribe(res => {
      this.partida = res;
      this.webSocket._connect(res.token);
      setTimeout(r => {
        this.webSocket._send(res)
        this.partida = this.webSocket.partida;
      },1000);
      console.log(res);
    })
  }

  listoPartida():void {
    this.partidaService.iniciarPartida(true, this.formPartida.controls.token.value).subscribe(res => {
      this.partida = res;
      this.webSocket._connect(res.token);
      console.log(res);
      setTimeout(r => {
        this.webSocket._send(res)
        this.partida = this.webSocket.partida;
      }
      , 1000)
    })
  }
  
  
}
