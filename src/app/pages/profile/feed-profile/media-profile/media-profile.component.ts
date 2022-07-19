import { Component, OnInit } from '@angular/core';
import { ITweet } from 'src/app/interfaces/Tweet';
import { IUser } from 'src/app/interfaces/User';
import { TweetsService } from '../../services/tweets.service';
import { UserService } from '../../services/user.service';
import { tap } from 'rxjs';
@Component({
  selector: 'app-media-profile',
  templateUrl: './media-profile.component.html',
  styleUrls: ['./media-profile.component.css']
})
export class MediaProfileComponent implements OnInit {

  tweets: ITweet[] = []

  retweets: any;
  likes: any;
  user!: IUser;

  constructor(private userSvc: UserService, private tweetSvc: TweetsService) { }

  ngOnInit(): void {
    this.userSvc.getUserData("MedinaVilla23").pipe(tap(res => {
      this.user = res;
    })).subscribe();

    this.userSvc.getUserInteraction("MedinaVilla23").pipe(tap(tweetsInteraction => {
      this.retweets = tweetsInteraction.retweet;
      this.likes = tweetsInteraction.liked;
    })).subscribe();

    this.tweetSvc.getTweetsWithMedia("MedinaVilla23").pipe(tap(tweets => {
      this.tweets = tweets;
    })).subscribe();
  }

}
