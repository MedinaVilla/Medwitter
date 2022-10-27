import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ITweet } from 'src/app/interfaces/Tweet';
import { getFullDateFormmated } from 'src/app/utils/DateUtils';
import { TweetInteractionService } from './services/tweet-interaction.service';
import { tap } from 'rxjs';
import { Location } from '@angular/common';
import { ssEvents } from "./../../../../../config";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css'],
})
export class TweetComponent implements OnChanges {
  @Input() showTweetType?: boolean = true;
  @Input() showMedia?: boolean = true;
  @Input() tweet!: ITweet;
  @Input() retweets!: any;
  @Input() likes!: any;
  @Input() division!: boolean;


  showPhotoModal: boolean = false;
  showModalReply: boolean = false;
  showProfileCard: boolean = false;
  showOptionsTweet: boolean = false;

  index!: number;

  constructor(private location: Location, private router: Router, private tweetInteractionSvc: TweetInteractionService, private sanitized: DomSanitizer) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tweet']?.currentValue) {
      ssEvents.addEventListener("change_interaction_tweet_" + this.tweet.idTweet, (e) => {
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
  }

  goToTweet(tweet: ITweet): void {
    this.router.navigate(['/' + tweet.user.username + '/status/' + tweet.idTweet]);
  }

  goToProfile(event: Event): void {
    event.stopPropagation();
    this.router.navigate(['/' + this.tweet.user.username]);
  }

  getDate(date: Date) {
    return getFullDateFormmated(new Date(date));
  }

  makeTweet(event: Event): void {
    event.stopPropagation();
    document.body.style.overflow = "hidden";
    this.showModalReply = true;
  }

  closeMakeTweet(): void {
    document.body.style.overflow = "inherit";
    this.showModalReply = false;
  }

  showPhotoDetails(event: Event, index: number): void {
    event.stopPropagation();
    this.index = index;
    document.body.style.overflow = "hidden";
    this.location.go('/MedinaVilla23/status/' + this.tweet.idTweet + "/photo/" + index)
    this.showPhotoModal = true;
  }

  closePhotoDetails(): void {
    this.location.go("/");
    document.body.style.overflow = "inherit";
    this.showPhotoModal = false;
  }

  displayTweetContent(): SafeHtml {
    let hastags = this.findHashtags(this.tweet.content.text);
    let userTags = this.findUsersTags(this.tweet.content.text);
    let textArray = this.tweet.content.text.split(/\s/);

    let html = this.sanitized.bypassSecurityTrustHtml(`<div class='text'>
    ${textArray.map((w) => {
      if (hastags.includes(w)) {
        return `<span onclick="event.stopPropagation();window.location.href='/search?q=${w.substring(1, w.length)}'" style='color:rgb(29, 155, 240)' onMouseOver="this.style.textDecoration = 'underline'" onMouseOut="this.style.textDecoration = 'none'">${w} </span>`
      } else if (userTags.includes(w)) {
        return `<span onclick="event.stopPropagation();window.location.href='/${w.substring(1, w.length)}'" style='color:rgb(29, 155, 240)' onMouseOver="this.style.textDecoration = 'underline'" onMouseOut="this.style.textDecoration = 'none'">${w} </span>`
      } else return w + ' '
    }).join('')}
    </div>
    `)
    return html;
  }

  showProfilePreviewCard(): void {
    this.showProfileCard = true;
  }

  hideProfilePreviewCard(): void {
    this.showProfileCard = false;
  }

  showOptionsTweetHandler(event: Event): void {
    event.stopPropagation();
    this.showOptionsTweet = true;
  }

  hideOptionsTweetHandler(event: Event): void {
    this.showOptionsTweet = false;
  }

  findHashtags(searchText: string): string[] {
    var regexp = /\B\#\w\w+\b/g
    let result = searchText.match(regexp);
    if (result) {
      return result;
    } else {
      return [];
    }
  }

  findUsersTags(searchText: string): string[] {
    var regexp = /\B\@\w\w+\b/g
    let result = searchText.match(regexp);
    if (result) {
      return result;
    } else {
      return [];
    }
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

}