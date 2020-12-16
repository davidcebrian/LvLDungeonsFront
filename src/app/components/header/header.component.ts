import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  searchForm: FormGroup;
  constructor( private build: FormBuilder ) { 

    this.searchForm = this.build.group({
      input: ['']
    })
    
  }

  ngOnInit(): void {
  }

}
