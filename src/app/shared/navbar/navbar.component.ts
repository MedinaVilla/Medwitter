import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  host: {
    '(document:click)': 'onClick($event)',
  },
})
export class NavbarComponent implements OnInit {

  showMenu:boolean = false;
  showOptions:boolean = false;
  

  constructor() { }

  ngOnInit(): void {
  }

  showMenuHandler():void{
    this.showMenu = true;
  }
  
  showOptionsHandler():void{
    this.showOptions = true;
  }

  hideMenuHandler():void{
    this.showMenu = false;
  }
  hideOptionsHandler():void{
    this.showOptions = false;
  }

}
