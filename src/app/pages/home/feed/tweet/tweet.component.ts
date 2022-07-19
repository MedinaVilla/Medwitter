import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ITweet } from 'src/app/interfaces/Tweet';
import { getFullDateFormmated } from 'src/app/utils/DateUtils';
@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css'],
})
export class TweetComponent implements OnInit {

  @Input() tweet!: ITweet;
  @Input() retweets!: any;
  @Input() likes!:any;

  @Input() division = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
    
  }

  goToTweet(tweet: ITweet): void {
    this.router.navigate(['/' + tweet.user.username + '/status/'+tweet.idTweet]);
  }

  isRetweetedByME(tweet:ITweet):boolean{
    return this.retweets.filter((retweet: { idTweet: any; })=>retweet.idTweet == tweet.idTweet).length > 0;
  }
  isLikedByME(tweet:ITweet):boolean{
    return this.likes.filter((like: { idTweet: any; })=>like.idTweet == tweet.idTweet).length > 0;
  }

  getDate(date:Date){
    return getFullDateFormmated(new Date(date));

  }
}
