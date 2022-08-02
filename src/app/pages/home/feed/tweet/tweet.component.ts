import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ITweet } from 'src/app/interfaces/Tweet';
import { getFullDateFormmated } from 'src/app/utils/DateUtils';
import { TweetInteractionService } from './services/tweet-interaction.service';
import { tap } from 'rxjs';
import {Location} from '@angular/common'; 
import { ssEvents } from "./../../../../../config";
@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css'],
})
export class TweetComponent implements OnChanges {
  @Input() showTweetType?: boolean;
  @Input() showMedia?:boolean = true;
  @Input() tweet!: ITweet;
  @Input() retweets!: any;
  @Input() likes!: any;
  @Input() division = true;

  
  showPhotoModal: boolean = false;
  showModalReply: boolean = false;
  index!:number;

  constructor(private location: Location, private router: Router, private tweetInteractionSvc: TweetInteractionService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tweet']?.currentValue) {
      ssEvents.addEventListener("change_interaction_tweet_" + this.tweet.idTweet, (e) => {
        const data = JSON.parse(e.data);
        console.log(data);
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

  retweetTweet(event: Event): void {
    event.stopPropagation();

    this.tweetInteractionSvc.doRetweetTweet({
      username: this.tweet.user.username,
      idTweet: this.tweet.idTweet
    }).pipe(tap(response => {
      console.log("Rewtweet")
    })).subscribe();

  }

  unRetweetTweet(event: Event): void {
    event.stopPropagation();

    this.tweetInteractionSvc.doUnRetweetTweet({
      username: this.tweet.user.username,
      idTweet: this.tweet.idTweet
    }).pipe(tap(response => {
      console.log("Rewtweet")
    })).subscribe();
  }

  makeTweet(event: Event): void {
    event.stopPropagation();
    this.showModalReply = true;
  }

  closeMakeTweet(): void {
    this.showModalReply = false;
  }

  showPhotoDetails(event: Event, index: number): void {
    event.stopPropagation();
    this.index = index;
    document.body.style.overflow = "hidden";
    this.location.go('/MedinaVilla23/status/'+this.tweet.idTweet+"/photo/"+index)
    this.showPhotoModal = true;
  }

  closePhotoDetails():void{
    this.location.go("/");
    document.body.style.overflow = "scroll";
    this.showPhotoModal = false;
  }

  dislikeTweet(event: Event): void {
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