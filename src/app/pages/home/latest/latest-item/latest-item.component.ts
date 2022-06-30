import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface ITweet {
  id: string,
  type: number
  categorie: string,
  title: string,
  image?: string,
  trends?: string[],
  tweets?:string
}

@Component({
  selector: 'app-latest-item',
  templateUrl: './latest-item.component.html',
  styleUrls: ['./latest-item.component.css']
})
export class LatestItemComponent implements OnInit {
  @Input() item!:ITweet;
  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToEvent():void{
    this.router.navigate(['/i/events/' + this.item.id]);
  }


}
