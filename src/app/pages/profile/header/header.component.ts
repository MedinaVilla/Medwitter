import { Component, Input, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { IUser } from 'src/app/interfaces/User';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  @Input() user!:IUser;
  constructor(private _location: Location) { }

  ngOnInit(): void {
    
  }

  goBackNavigate():void{
    this._location.back();
  }

}
