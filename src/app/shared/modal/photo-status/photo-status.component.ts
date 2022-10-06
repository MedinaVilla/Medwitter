import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';
import { ITweet } from 'src/app/interfaces/Tweet';
import { TweetsService } from 'src/app/pages/profile/services/tweets.service';
import { UserService } from 'src/app/pages/profile/services/user.service';
import { ssEvents } from 'src/config';
@Component({
  selector: 'app-photo-status',
  templateUrl: './photo-status.component.html',
  styleUrls: ['./photo-status.component.css']
})
export class PhotoStatusComponent implements OnInit {
  @Input() idTweet!: number;
  @Input() user!: string;
  @Input() index!: number;
  @Output() hideModal = new EventEmitter<string>();

  tweet!: ITweet;
  retweets!: any;
  likes!: any;
  replies!: ITweet[];

  text!: string;

  constructor(private userSvc: UserService, private tweetSvc: TweetsService, private route: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.userSvc.getUserInteraction("MedinaVilla23").pipe(tap(res => {
      this.retweets = res.retweet;
      this.likes = res.liked;
    })).subscribe();

    let idTweet = this.idTweet;
    let username = this.user;

    this.tweetSvc.getTweet(username, idTweet).pipe(tap(tweet => {
      this.tweet = tweet;
    })).subscribe();

    this.tweetSvc.getRepliesTweet(username, idTweet).pipe(tap(replies => {
      if (replies.replies)
        this.replies = replies.replies;
    })).subscribe();


    ssEvents.addEventListener("change_interaction_tweet_" + idTweet, (e) => {
      const data = JSON.parse(e.data);
      if (typeof data.likes !== 'undefined') {
        this.tweet.content.likes = data.likes;
      }
      if (typeof data.retweets !== 'undefined') {
        this.tweet.content.retweets = data.retweets;
      }
      if (typeof data.replies !== 'undefined') {
        this.tweet.content.replies = data.replies;
      }
      this.retweets = data.user_interaction.retweet;
      this.likes = data.user_interaction.liked;
    })

  }



  hideModalHandler(): void {
    this.hideModal.emit();
  }

  replyTweet(data: any): void {
    let media = [];
    if (data.filesPure) {
      media = data.filesPure;
    }

    this.tweetSvc.makeReplyTweet(data.filesPure, data.text, data.gif, this.tweet.idTweet.toString(), this.tweet.user.username).pipe(tap(response => {
      this.toastr.success('', 'Tu tweet se envió', {
        positionClass: "toast-bottom-center"
      });
    })).subscribe();

  }
}
