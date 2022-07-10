import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ITweet } from 'src/app/interfaces/Tweet';
@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css'],
})
export class TweetComponent implements OnInit {

  @Input() tweet!: ITweet;
  @Input() retweets!: any;
  @Input() likes!:any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log(this.tweet);

  }

  goToTweet(tweet: ITweet): void {
    this.router.navigate(['/' + tweet.user + '/status/223232372362832']);
  }

  isRetweetedByME(tweet:ITweet):boolean{
    return this.retweets.filter((retweet: { idTweet: any; })=>retweet.idTweet == tweet.idTweet).length > 0;
  }
  isLikedByME(tweet:ITweet):boolean{
    return this.likes.filter((like: { idTweet: any; })=>like.idTweet == tweet.idTweet).length > 0;
  }
}
