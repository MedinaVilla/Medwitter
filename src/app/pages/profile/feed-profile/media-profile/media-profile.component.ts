import { Component, OnInit } from '@angular/core';
import { ITweet } from 'src/app/interfaces/Tweet';

@Component({
  selector: 'app-media-profile',
  templateUrl: './media-profile.component.html',
  styleUrls: ['./media-profile.component.css']
})
export class MediaProfileComponent implements OnInit {

  tweets: ITweet[] = []

  constructor() { }

  ngOnInit(): void {
  }

}
