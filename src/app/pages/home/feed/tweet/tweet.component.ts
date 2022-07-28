import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ITweet } from 'src/app/interfaces/Tweet';
import { getFullDateFormmated } from 'src/app/utils/DateUtils';
import { TweetInteractionService } from './services/tweet-interaction.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css'],
})
export class TweetComponent implements OnInit {

  @Input() tweet!: ITweet;
  @Input() retweets!: any;
  @Input() likes!: any;
  @Input() division = true;

  showModalReply:boolean = false;


  constructor(private router: Router, private tweetInteractionSvc: TweetInteractionService) { }

  ngOnInit(): void {

  }

  goToTweet(tweet: ITweet): void {
    this.router.navigate(['/' + tweet.user.username + '/status/' + tweet.idTweet]);
  }

  isRetweetedByME(tweet: ITweet): boolean {
    return this.retweets.filter((retweet: { idTweet: any; }) => retweet.idTweet == tweet.idTweet).length > 0;
  }
  isLikedByME(tweet: ITweet): boolean {
    return this.likes.filter((like: { idTweet: any; }) => like.idTweet == tweet.idTweet).length > 0;
  }

  getDate(date: Date) {
    return getFullDateFormmated(new Date(date));
  }

  retweetTweet(event:Event): void {
    event.stopPropagation();
    
    this.tweetInteractionSvc.doRetweetTweet({
      username: this.tweet.user.username,
      idTweet: this.tweet.idTweet
    }).pipe(tap(response => {
      console.log("Rewtweet")
    })).subscribe();

  }

  unRetweetTweet(event:Event): void {
    event.stopPropagation();

    this.tweetInteractionSvc.doUnRetweetTweet({
      username: this.tweet.user.username,
      idTweet: this.tweet.idTweet
    }).pipe(tap(response => {
      console.log("Rewtweet")
    })).subscribe();
  }

  makeTweet(event:Event): void {
    event.stopPropagation();
    this.showModalReply = true;
  }

  closeMakeTweet(): void {
    this.showModalReply = false;
  }

  dislikeTweet(event:Event): void {
    event.stopPropagation();

    this.tweetInteractionSvc.doDislikeTweet({
      username: this.tweet.user.username,
      idTweet: this.tweet.idTweet
    }).pipe(tap(response => {
      console.log("Disliked")
    })).subscribe();
  }

  likeTweet(event: Event): void {
    event.stopPropagation();

    this.tweetInteractionSvc.doLikeTweet({
      username: this.tweet.user.username,
      idTweet: this.tweet.idTweet
    }).pipe(tap(response => {
      console.log("Liked")
    })).subscribe();
  }

}
