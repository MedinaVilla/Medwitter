import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})

export class NavbarComponent implements OnInit {

  showMenu: boolean = false;
  showOptions: boolean = false;
  showModalTweet: boolean = false;


  constructor() { }

  ngOnInit(): void {
  }

  showMenuHandler(): void {
    this.showMenu = true;
  }

  showOptionsHandler(): void {
    this.showOptions = true;
  }

  hideMenuHandler(): void {
    this.showMenu = false;
  }
  hideOptionsHandler(): void {
    this.showOptions = false;
  }

  showModalHandler(): void {
    this.showModalTweet = true;
  }

  hideModalHandler(): void {
    this.showModalTweet = false;
  }

}
