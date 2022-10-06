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

  showImageProfile:boolean = false;
  showBannerProfile: boolean = false;

  constructor(private _location: Location) { }

  ngOnInit(): void {
    
  }

  goBackNavigate():void{
    this._location.back();
  }

  showImageProfileHandler():void{
    this.showImageProfile = true;
  }

  hideImageProfileHandler():void{
    this.showImageProfile = false;
  }

  showBannerProfileHandler():void{
    this.showBannerProfile = true;
  }
  
  hideBannerProfileHandler():void{
    this.showBannerProfile = false;
  }

  stopPropagation(event: Event):void{
    event.stopPropagation();
  }
  
}
