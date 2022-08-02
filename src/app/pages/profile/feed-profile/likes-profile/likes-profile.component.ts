import { Component, OnInit } from '@angular/core';
import { ITweet } from 'src/app/interfaces/Tweet';
import { TweetsService } from '../../services/tweets.service';
import { UserService } from '../../services/user.service';
import { tap } from 'rxjs';
import { IUser } from 'src/app/interfaces/User';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-likes-profile',
  templateUrl: './likes-profile.component.html',
  styleUrls: ['./likes-profile.component.css']
})
export class LikesProfileComponent implements OnInit {

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
    this.tweetSvc.getTweetsLiked(user!).pipe(tap(tweetsInteraction => {
      this.tweets = tweetsInteraction;
    })).subscribe();
    this.userSvc.getUserInteraction("MedinaVilla23").pipe(tap(interaction => {
      this.retweets = interaction.retweet;
      this.likes = interaction.liked;
    })).subscribe();
  }
}
