import { Component, OnInit } from '@angular/core';
import { ITweet } from 'src/app/interfaces/Tweet';
@Component({
  selector: 'app-event-related',
  templateUrl: './event-related.component.html',
  styleUrls: ['./event-related.component.css']
})
export class EventRelatedComponent implements OnInit {
  
  tweets:ITweet[]=[];


  constructor() { }

  ngOnInit(): void {
  }

}
