import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ITweet } from 'src/app/interfaces/Tweet';
import { getTimeFromDate, getFullDateFormmated } from 'src/app/utils/DateUtils';

@Component({
  selector: 'app-tweet-details',
  templateUrl: './tweet-details.component.html',
  styleUrls: ['./tweet-details.component.css']
})
export class TweetDetailsComponent implements OnInit, AfterViewInit {

  @Input() tweet!: ITweet; 
  @Input() retweets!: any;
  @Input() likes!:any;
  
  constructor() { }

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
}
