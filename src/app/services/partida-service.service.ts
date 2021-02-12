import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { Partida, PersonajePartida } from '../interfaces/userInterface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartidaServiceService {

  private endP = '/personaje'
  
  constructor( private http: HttpClient, private db: DatabaseService ) { }

  iniciarPartida(listoPartida?:boolean, tokenPartida?: String): Observable<Partida> {

    let body: PersonajePartida = {
      listo: listoPartida,
      token: tokenPartida,
    }

    return this.http.put<Partida>(this.endP + '/' + localStorage.getItem('id'), body).pipe(partida => {
      return partida;
    })
  }






}
