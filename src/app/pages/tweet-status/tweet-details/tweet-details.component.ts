import { Component, Input, OnInit } from '@angular/core';

interface ITweet {
  user: {
    name: string,
    username: string,
    image: string
  },
  content: {
    text: string,
    images?: string[]
    replies: number,
    retweets: {
      retweetedByMe: boolean,
      number: number
    },
    likes: {
      likedByMe: boolean,
      number: number
    }
    timeAgo: {
      ago: string,
      hour: string,
      date:string
    }
    liked?: {
      name: string
    },
    retweetted?: {
      name: string
    },
    interest?: {
      name: string
    }
  }
}

@Component({
  selector: 'app-tweet-details',
  templateUrl: './tweet-details.component.html',
  styleUrls: ['./tweet-details.component.css']
})
export class TweetDetailsComponent implements OnInit {

  @Input() tweet!: ITweet; 

  constructor() { }

  ngOnInit(): void {
  }

}
