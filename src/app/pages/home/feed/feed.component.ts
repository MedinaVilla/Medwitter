import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { ITweet } from 'src/app/interfaces/Tweet';
import { UserService } from '../../profile/services/user.service';
import { FeedService } from './services/feed.service';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  /*
    type: 1 = 
  */
  tweets: ITweet[] = [];
  retweets: any;
  likes: any;
  
  constructor(private route: ActivatedRoute,private feedSvc: FeedService, private userSvc: UserService) { }

  ngOnInit(): void {
    let user = this.route.snapshot.paramMap.get('user');
    if(!user){
      user = "MedinaVilla23"
    }
    console.log(user);

    this.feedSvc.getFeed(user).pipe(tap(tweets => {
      this.tweets = tweets;
    })).subscribe();
    this.userSvc.getUserInteraction("MedinaVilla23").pipe(tap(tweetsInteraction => {
      this.retweets = tweetsInteraction.retweet;
      this.likes = tweetsInteraction.liked;
    })).subscribe();
  }
}