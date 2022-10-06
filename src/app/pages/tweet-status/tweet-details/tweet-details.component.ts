import { Location } from '@angular/common';
import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { ITweet } from 'src/app/interfaces/Tweet';
import { getTimeFromDate, getFullDateFormmated } from 'src/app/utils/DateUtils';
import { ssEvents } from 'src/config';
import { TweetInteractionService } from '../../home/feed/tweet/services/tweet-interaction.service';

@Component({
  selector: 'app-tweet-details',
  templateUrl: './tweet-details.component.html',
  styleUrls: ['./tweet-details.component.css']
})
export class TweetDetailsComponent implements OnChanges {

  @Input() showMedia?:boolean = true;
  @Input() tweet!: ITweet; 
  @Input() retweets!: any;
  @Input() likes!:any;
  
  showModalReply = false;
  showOptionsTweet = false;
  showPhotoModal: boolean = false;
  index!:number;

  constructor(private location: Location, private tweetInteractionSvc: TweetInteractionService, private router: Router, private sanitized: DomSanitizer) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tweet']?.currentValue) {
      ssEvents.addEventListener("change_interaction_tweet_" + this.tweet.idTweet, (e) => {
        const data = JSON.parse(e.data);
        if(typeof data.likes !== 'undefined'){
          this.tweet.content.likes = data.likes;
        }
        if(typeof data.retweets !== 'undefined'){
          this.tweet.content.retweets = data.retweets;
        }
        if(typeof data.replies !== 'undefined'){
          this.tweet.content.replies = data.replies;
        }
        this.retweets = data.user_interaction.retweet;
        this.likes = data.user_interaction.liked;
      })
    }
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
      console.log("Un rewtweet")
    })).subscribe();
  }

  makeTweet(): void {
    document.body.style.overflow = "hidden";
    this.showModalReply = true;
  }

  closeMakeTweet(): void {
    document.body.style.overflow = "inherit";
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

  goToTweetReplied(username: string, idTweet: number):void{
      this.router.navigate(['/' +username + '/status/' +idTweet]);
  }
  
  goToProfile(event:Event):void{
    event.stopPropagation();
    this.router.navigate(['/' + this.tweet.user.username]);
  }

  
  showPhotoDetails(event: Event, index: number): void {
    console.log("ENTRA")
    event.stopPropagation();
    this.index = index;
    document.body.style.overflow = "hidden";
    // this.location.go('/MedinaVilla23/status/'+this.tweet.idTweet+"/photo/"+index)
    console.log(window.history)
    this.showPhotoModal = true;
  }

  closePhotoDetails():void{
    // this.location.go("/");
    document.body.style.overflow = "scroll";
    this.showPhotoModal = false;
  }

  displayTweetContent(): SafeHtml {
    let hastags = this.findHashtags(this.tweet.content.text);
    let textArray = this.tweet.content.text.split(" ");

    let html = this.sanitized.bypassSecurityTrustHtml(`<div class='text'>
    ${textArray.map((w) => {
      return !hastags.includes(w) ? w + " " : `<span onclick="event.stopPropagation();window.location.href='/search?q=${w.substring(1, w.length)}'" style='color:rgb(29, 155, 240)' onMouseOver="this.style.textDecoration = 'underline'; this.style.cursor = 'pointer'" onMouseOut="this.style.textDecoration = 'none'">${w}</span>`
    }).join('')}
    </div>
    `)
    return html;
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

  showOptionsTweetHandler(event:Event):void{
    event.stopPropagation();
    this.showOptionsTweet = true;
  }

  hideOptionsTweetHandler(event:Event):void{
    this.showOptionsTweet = false;
  }

  stopPropagation(event:Event):void{
    event.stopPropagation();
  }

}
