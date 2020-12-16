import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
@Component({
  selector: 'tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {

  users: any[];
  
  constructor( private dbservice: DatabaseService) { }

  ngOnInit(): void {
    this.dbservice.GetAllUsers().subscribe(res => {
      this.users = res;
    })

  }

}
