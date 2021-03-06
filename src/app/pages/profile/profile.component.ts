import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { IUser } from 'src/app/interfaces/User';
import {
  ITweet
} from 'src/app/interfaces/Tweet';
import { UserService } from './services/user.service';
import { TweetsService } from './services/tweets.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  tweets: ITweet[] = []
  retweets: any;
  likes: any;
  user!: IUser;

  constructor(private route: ActivatedRoute, private userSvc: UserService, private tweetSvc: TweetsService) { }

  ngOnInit(): void {

  let user = this.route.snapshot.paramMap.get('user');
    this.userSvc.getUserData(user!).pipe(tap(res => {
      this.user = res;
    })).subscribe();

    this.tweetSvc.getTweetsInteraction(user!).pipe(tap(tweetsInteraction => {
      this.tweets = tweetsInteraction.tweets;
      this.retweets = tweetsInteraction.retweet;
      this.likes = tweetsInteraction.liked;
    })).subscribe();
  }

}
