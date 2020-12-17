import { Component, Injectable, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'events';
import { DatabaseService } from '../../services/database.service';
@Component({
  selector: 'tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})

@Injectable()
export class TablaComponent implements OnInit {

  users: any[];
  
  constructor( private dbservice: DatabaseService) { }
  ngOnInit(): void {
    this.cargarDatos();
    }
  
  cargarDatos():void {
    this.dbservice.GetAllUsers().subscribe(res => {
      this.users = res;
    })
  }


}
