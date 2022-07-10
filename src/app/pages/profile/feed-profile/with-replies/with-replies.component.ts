import { Component, OnInit } from '@angular/core';
import { ITweet } from 'src/app/interfaces/Tweet';
@Component({
  selector: 'app-with-replies',
  templateUrl: './with-replies.component.html',
  styleUrls: ['./with-replies.component.css']
})
export class WithRepliesComponent implements OnInit {

  tweets: ITweet[] = []

  constructor() { }

  ngOnInit(): void {
  }

}
