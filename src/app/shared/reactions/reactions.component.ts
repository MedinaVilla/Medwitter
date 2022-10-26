import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITweet } from 'src/app/interfaces/Tweet';
import { TweetInteractionService } from 'src/app/pages/home/feed/tweet/services/tweet-interaction.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-reactions',
  templateUrl: './reactions.component.html',
  styleUrls: ['./reactions.component.css']
})
export class ReactionsComponent implements OnInit {

  @Input() retweets!: any;
  @Input() likes!: any;
  @Input() tweet: any;
  @Input() modeDark: boolean = true;

  @Output() showModalReply = new EventEmitter<any>();

  constructor(private tweetInteractionSvc: TweetInteractionService) { }

  ngOnInit(): void {

  }

  isRetweetedByME(tweet: ITweet): boolean {
    return this.retweets.filter((retweet: { idTweet: any; }) => retweet.idTweet == tweet.idTweet).length > 0;
  }
  isLikedByME(tweet: ITweet): boolean {
    return this.likes.filter((like: { idTweet: any; }) => like.idTweet == tweet.idTweet).length > 0;
  }

  retweetTweet(event: Event): void {
    event.stopPropagation();

    this.tweetInteractionSvc.doRetweetTweet({
      username: this.tweet.user.username,
      idTweet: this.tweet.idTweet
    }).pipe(tap(response => {

    })).subscribe();

  }

  unRetweetTweet(event: Event): void {
    event.stopPropagation();

    this.tweetInteractionSvc.doUnRetweetTweet({
      username: this.tweet.user.username,
      idTweet: this.tweet.idTweet
    }).pipe(tap(response => {

    })).subscribe();
  }

  makeTweet(event: Event): void {
    event.stopPropagation();
    document.body.style.overflow = "hidden";
    this.showModalReply.emit(event);
  }

  closeMakeTweet(): void {
    document.body.style.overflow = "inherit";
    this.showModalReply.emit(event);
  }


  dislikeTweet(event: Event,): void {
    event.stopPropagation();

    this.tweetInteractionSvc.doDislikeTweet({
      username: this.tweet.user.username,
      idTweet: this.tweet.idTweet
    }).pipe(tap(response => {

    })).subscribe();
  }

  likeTweet(event: Event): void {
    event.stopPropagation();

    this.tweetInteractionSvc.doLikeTweet({
      username: this.tweet.user.username,
      idTweet: this.tweet.idTweet
    }).pipe(tap(response => {

    })).subscribe();
  }

}
