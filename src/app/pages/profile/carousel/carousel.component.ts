import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  showBannerProfile: string = "";
  constructor() { }

  ngOnInit(): void {
  }


  showBannerProfileHandler(image:string):void{
    this.showBannerProfile = image;
  }
  
  hideBannerProfileHandler():void{
    this.showBannerProfile = "";
  }

  stopPropagation(event: Event):void{
    event.stopPropagation();
  }
}
