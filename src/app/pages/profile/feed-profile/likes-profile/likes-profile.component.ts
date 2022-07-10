import { Component, OnInit } from '@angular/core';
import { ITweet } from 'src/app/interfaces/Tweet';

@Component({
  selector: 'app-likes-profile',
  templateUrl: './likes-profile.component.html',
  styleUrls: ['./likes-profile.component.css']
})
export class LikesProfileComponent implements OnInit {

  tweets: ITweet[] = []

  constructor() { }

  ngOnInit(): void {
  }

}
