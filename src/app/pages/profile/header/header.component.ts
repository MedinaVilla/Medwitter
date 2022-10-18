import { Component, Input, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { IUser } from 'src/app/interfaces/User';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  @Input() user!:IUser;

  showImageProfile:boolean = false;
  showBannerProfile: boolean = false;

  myProfile!:boolean;

  constructor(private _location: Location, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let user = this.route.snapshot.paramMap.get('user');
    this.myProfile = user =='MedinaVilla23';
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
