import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    timeAgo: string,
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
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css'],
})
export class TweetComponent implements OnInit {

  @Input() tweet!: ITweet;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToTweet(tweet: ITweet): void {
    this.router.navigate(['/' + tweet.user.username + '/status/223232372362832']);
  }

}
