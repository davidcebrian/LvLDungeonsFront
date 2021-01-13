import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'get-users',
  templateUrl: './get-users.component.html',
  styleUrls: ['./get-users.component.scss']
})
export class GetUsersComponent implements OnInit {

  users: any[];

  constructor( private dbservice: DatabaseService) { }

  ngOnInit(): void {
    this.dbservice.GetAllUsers().subscribe( res => {
      this.users = res;
    })
  }

}
