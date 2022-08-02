import { Component, OnInit } from '@angular/core';
import { ITweet } from 'src/app/interfaces/Tweet';
import { TweetsService } from '../../services/tweets.service';
import { UserService } from '../../services/user.service';
import { tap } from 'rxjs';
import { IUser } from 'src/app/interfaces/User';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-with-replies',
  templateUrl: './with-replies.component.html',
  styleUrls: ['./with-replies.component.css']
})
export class WithRepliesComponent implements OnInit {

  tweets: ITweet[] = []
  retweets: any;
  likes: any;
  user!: IUser;

  constructor(private route:ActivatedRoute, private userSvc: UserService, private tweetSvc: TweetsService) { }

  ngOnInit(): void {
    let user = this.route.snapshot.paramMap.get('user');

    
    this.userSvc.getUserData(user!).pipe(tap(res => {
      this.user = res;
    })).subscribe();

    this.tweetSvc.getTweetsWithReplies(user!).pipe(tap(tweets => {
      this.tweets = tweets;
    })).subscribe();

    this.userSvc.getUserInteraction("MedinaVilla23").pipe(tap(tweetsInteraction => {
      this.retweets = tweetsInteraction.retweet;
      this.likes = tweetsInteraction.liked;
    })).subscribe();
  }
}
