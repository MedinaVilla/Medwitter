import { Component, OnInit, Output } from '@angular/core';
import { ITweet } from 'src/app/interfaces/Tweet';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  /*
    type: 1 = 
  */
  tweets:ITweet[]=[];

  constructor() { }

  ngOnInit(): void {
  }

}
