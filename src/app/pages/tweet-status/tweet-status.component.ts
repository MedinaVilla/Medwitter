import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ITweet } from 'src/app/interfaces/Tweet';
import { tap } from 'rxjs';
import { UserService } from '../profile/services/user.service';
import { TweetsService } from '../profile/services/tweets.service';
import { IUser } from 'src/app/interfaces/User';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tweet-status',
  templateUrl: './tweet-status.component.html',
  styleUrls: ['./tweet-status.component.css']
})
export class TweetStatusComponent implements OnInit {
  tweet!: ITweet;
  retweets!: any;
  likes!: any;
  replies!: ITweet[];

  text!:string;

  constructor(private _location: Location, private userSvc: UserService, private tweetSvc: TweetsService, private route: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.userSvc.getUserInteraction("MedinaVilla23").pipe(tap(res => {
      this.retweets = res.retweet;
      this.likes = res.liked;
    })).subscribe();

    let idTweet = parseInt(this.route.snapshot.paramMap.get('idTweet')!);
    let username = this.route.snapshot.paramMap.get('user')!;


    this.tweetSvc.getTweet(username, idTweet).pipe(tap(tweet => {
      this.tweet = tweet;
    })).subscribe();

    this.tweetSvc.getRepliesTweet(username, idTweet).pipe(tap(replies => {
      if (replies.replies)
        this.replies = replies.replies;
    })).subscribe();

  }

  replyTweet(): void {
    let tweet = {
      type: 2,
      user: {
        name: "Jesus Medina",
        username: "MedinaVilla23",
        image: "./../../../../../assets/profile.jpg"
      },
      content: {
        text: this.text
      },
      replies: []
    }

    this.tweetSvc.makeReplyTweet(tweet, this.tweet.idTweet, this.tweet.user.username).pipe(tap(response => {
      this.toastr.success('', 'Tu tweet se envió', {
        positionClass: "toast-bottom-center"
      });
      this.text = "";

    })).subscribe();
  }
  goBackNavigate(): void {
    this._location.back();
  }


}
