import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonajePartida, User } from 'src/app/interfaces/userInterface';
import { DatabaseService } from 'src/app/services/database.service';
import { PartidaServiceService } from 'src/app/services/partida-service.service';
import { WebSocketAPI } from 'src/app/services/ws/web-socket-api.service';
import { Partida } from '../../interfaces/userInterface';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {

  usuarioAutenticado: User;
  usernameOwner: string;
  partida: Partida = null;
  formPartida: FormGroup;
  listo:boolean = false;
  todosListo: boolean = false;
  idOwner: number;
  imOwner: boolean = false;
  connected: boolean = false;


  constructor(private router:Router,
              private dbService: DatabaseService,

              private partidaService: PartidaServiceService,
              private webSocket: WebSocketAPI,
              private build: FormBuilder
              ) {
                this.formPartida = this.build.group({
                token: ['', [Validators.maxLength(6), Validators.minLength(6), Validators.required]],
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
    //this.cambios();
  }

  isTodosListos() {

    let listosCont = 0;

    for(let personaje of this.partida.personajes) {
      if (personaje.empezarPartida == true) {
        listosCont++;
      }
    }

    if (listosCont == this.partida.personajes.length) {
      this.todosListo = true;
    } else {
      this.todosListo = false;
    }
  }

  cambios(){
    this.webSocket.cambiosEnPartida.subscribe(newPartida => {
      this.partida = newPartida;

      if (this.idOwner.toString() == localStorage.getItem('pj_id')) {
        this.imOwner = true;
      } else {
        this.imOwner = false;
      }

      this.isTodosListos();
    })
  }

  /**Para comprobar que existe el jwt del usuario que este autenticado */
  compruebaJwt():boolean{
    if(localStorage.getItem("jwt")!=null) return true;
    else return false;
  }

  private iniciarValoresPartida() {
    this.idOwner = this.partida.idOwner;

    this.partida.personajes.forEach(pj => {
      if(pj.id == this.idOwner) this.usernameOwner = pj.username
    })

    this.listo = false;
  }


  crearPartida():void {
    this.partidaService.iniciarPartidaVoid().subscribe(res => {
      console.log(res);
      this.partida = res;
      console.log(this.partida.token);
      if(!this.connected) this.webSocket._connect(this.partida.token);

      this.iniciarValoresPartida()

      this.imOwner = true;
      this.connected = true;
      this.cambios();
    })
  }

  unirsePartida( ):void {
    this.partidaService.iniciarPartidaToken( this.formPartida.controls.token.value ).subscribe(res => {
      this.partida = res;
      if(!this.connected) this.webSocket._connect(res.token);
      setTimeout(r => {
        this.webSocket._send(res, res.token)
      },1000);
      console.log(res);

      this.iniciarValoresPartida()
      this.connected = true;
      this.imOwner = false;
      this.cambios();
    })
  }

  listoPartida():void {
    this.partidaService.iniciarPartida(!this.listo, this.formPartida.controls.token.value).subscribe(res => {
      this.partida = res;
      if(!this.connected) this.webSocket._connect(res.token);
      this.listo = !this.listo;
      setTimeout(r => {
        this.webSocket._send(res, res.token)
      }
      , 1000)
    })
  }

  salirPartida(): void {
    this.partidaService.salirPartida().subscribe(response => {
      this.webSocket._send(response, response.token);
    })
    setTimeout(any => {
      this.webSocket._disconnect();
    },500);
    this.connected = false;
    this.partida = undefined;
    this.imOwner = false;
    this.idOwner = undefined;
    this.listo = false;
    this.todosListo = false;
  }


}
