import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  showMenu:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
  showMenuHandler():void{
    this.showMenu = true;
  }

}
