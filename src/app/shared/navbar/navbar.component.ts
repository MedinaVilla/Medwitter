import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})

export class NavbarComponent implements OnInit {

  showMenu: boolean = false;
  showOptions: boolean = false;
  showModalTweet: boolean = false;

  isMobile: boolean = false;

  route: string = "";
  constructor(location: Location, router: Router) {
    router.events.subscribe((val) => {
      if (location.path() != '') {
        this.route = location.path();
      } else {
        this.route = 'Home'
      }
    });
  }


  ngOnInit(): void {
    if (window.innerWidth < 1300) { // 768px portrait
      this.isMobile = true;
    }

  }

  onResize(event: any) {
    let screenWidth = event.target.innerWidth;
    if (screenWidth < 960) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
    console.log(event.target.innerWidth);

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
