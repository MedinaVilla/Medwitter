import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ITweet } from 'src/app/interfaces/Tweet';
import { tap } from 'rxjs';
import { UserService } from '../profile/services/user.service';
import { TweetsService } from '../profile/services/tweets.service';
import { IUser } from 'src/app/interfaces/User';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tweet-status',
  templateUrl: './tweet-status.component.html',
  styleUrls: ['./tweet-status.component.css']
})
export class TweetStatusComponent implements OnInit {
  tweet!: ITweet;
  retweets!: any;
  likes!: any;
  constructor(private _location: Location, private userSvc: UserService, private tweetSvc: TweetsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userSvc.getUserInteraction("MedinaVilla23").pipe(tap(res => {
      this.retweets = res.retweet;
      this.likes = res.liked;
    })).subscribe();

    let idTweet = parseInt(this.route.snapshot.paramMap.get('idTweet')!);
    let username = this.route.snapshot.paramMap.get('user')!;


    this.tweetSvc.getTweet(username, idTweet).pipe(tap(tweet => {
      console.log(tweet);
      this.tweet = tweet;
    })).subscribe();
  }


  goBackNavigate(): void {
    this._location.back();
  }


}
