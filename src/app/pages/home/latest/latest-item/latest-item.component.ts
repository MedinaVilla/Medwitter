import { Component, Input, OnInit } from '@angular/core';

interface ILatest {
  type: number
  categorie: string,
  title: string,
  image?: string,
  trends?: string[]
}

@Component({
  selector: 'app-latest-item',
  templateUrl: './latest-item.component.html',
  styleUrls: ['./latest-item.component.css']
})
export class LatestItemComponent implements OnInit {
  @Input() item!:ILatest;
  
  constructor() { }

  ngOnInit(): void {
  }

}
