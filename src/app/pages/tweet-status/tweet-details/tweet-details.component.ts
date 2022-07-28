import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { tap } from 'rxjs';
import { ITweet } from 'src/app/interfaces/Tweet';
import { getTimeFromDate, getFullDateFormmated } from 'src/app/utils/DateUtils';
import { TweetInteractionService } from '../../home/feed/tweet/services/tweet-interaction.service';

@Component({
  selector: 'app-tweet-details',
  templateUrl: './tweet-details.component.html',
  styleUrls: ['./tweet-details.component.css']
})
export class TweetDetailsComponent implements OnInit, AfterViewInit {

  @Input() tweet!: ITweet; 
  @Input() retweets!: any;
  @Input() likes!:any;
  
  showModalReply = false;

  constructor(private tweetInteractionSvc: TweetInteractionService) { }

  ngOnInit(): void {
  
  }

  ngAfterViewInit():void {
  }
     

  isRetweetedByME(tweet:ITweet):boolean{
    return this.retweets.filter((retweet: { idTweet: any; })=>retweet.idTweet == tweet.idTweet).length > 0;
  }
  isLikedByME(tweet:ITweet):boolean{
    return this.likes.filter((like: { idTweet: any; })=>like.idTweet == tweet.idTweet).length > 0;
  }

  getTime(date:any):any{
    return getTimeFromDate(new Date(date));
  }
  getDate(date:any):any{
    return getFullDateFormmated(new Date(date));
  }

  retweetTweet(): void {
    this.tweetInteractionSvc.doRetweetTweet({
      username: this.tweet.user.username,
      idTweet: this.tweet.idTweet
    }).pipe(tap(response => {
      console.log("Rewtweet")
    })).subscribe();

  }

  unRetweetTweet(): void {
    this.tweetInteractionSvc.doUnRetweetTweet({
      username: this.tweet.user.username,
      idTweet: this.tweet.idTweet
    }).pipe(tap(response => {
      console.log("Rewtweet")
    })).subscribe();
  }

  makeTweet(): void {
    this.showModalReply = true;
  }

  closeMakeTweet(): void {
    this.showModalReply = false;
  }

  dislikeTweet(): void {
    this.tweetInteractionSvc.doDislikeTweet({
      username: this.tweet.user.username,
      idTweet: this.tweet.idTweet
    }).pipe(tap(response => {
      console.log("Disliked")
    })).subscribe();
  }

  likeTweet(event: Event): void {
    event.preventDefault()

    this.tweetInteractionSvc.doLikeTweet({
      username: this.tweet.user.username,
      idTweet: this.tweet.idTweet
    }).pipe(tap(response => {
      console.log("Liked")
    })).subscribe();
  }


}
