import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IEvent } from 'src/app/interfaces/Event';

@Component({
  selector: 'app-latest-item',
  templateUrl: './latest-item.component.html',
  styleUrls: ['./latest-item.component.css']
})
export class LatestItemComponent implements OnInit {
  @Input() item!:IEvent ;
  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToEvent(_id:any):void{
    this.router.navigate(['/i/events/' + _id]);
  }


}
