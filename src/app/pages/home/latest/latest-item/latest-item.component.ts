import { Component, Input, OnInit } from '@angular/core';

interface ITweet {
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
  
  constructor() { }

  ngOnInit(): void {
  }

}
