import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';
import { ITweet } from 'src/app/interfaces/Tweet';
import { TweetsService } from 'src/app/pages/profile/services/tweets.service';
import { UserService } from 'src/app/pages/profile/services/user.service';

@Component({
  selector: 'app-photo-status',
  templateUrl: './photo-status.component.html',
  styleUrls: ['./photo-status.component.css']
})
export class PhotoStatusComponent implements OnInit {
  @Input() idTweet!: number;
  @Input() user!: string;
  @Input() index!: number;
  @Output() hideModal = new EventEmitter<string>();

  tweet!: ITweet;
  retweets!: any;
  likes!: any;
  replies!: ITweet[];

  text!: string;

  constructor(private userSvc: UserService, private tweetSvc: TweetsService, private route: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.userSvc.getUserInteraction("MedinaVilla23").pipe(tap(res => {
      this.retweets = res.retweet;
      this.likes = res.liked;
    })).subscribe();

    // let idTweet = parseInt(this.route.snapshot.paramMap.get('idTweet')!);
    let idTweet = this.idTweet;
    // let username = this.route.snapshot.paramMap.get('user')!;
    let username = this.user;

    this.tweetSvc.getTweet(username, idTweet).pipe(tap(tweet => {
      this.tweet = tweet;
    })).subscribe();

    this.tweetSvc.getRepliesTweet(username, idTweet).pipe(tap(replies => {
      if (replies.replies)
        this.replies = replies.replies;
    })).subscribe();

  }

  hideModalHandler(): void {
    this.hideModal.emit();
  }

  replyTweet(): void {
    let tweet = {
      type: 2,
      user: {
        name: "Jesus Medina",
        username: "MedinaVilla23",
        image: "./../../../../../assets/profile.jpg"
      },
      content: {
        text: this.text
      },
      replies: []
    }

    this.tweetSvc.makeReplyTweet(tweet, this.tweet.idTweet, this.tweet.user.username).pipe(tap(response => {
      this.toastr.success('', 'Tu tweet se envió', {
        positionClass: "toast-bottom-center"
      });
      this.text = "";

    })).subscribe();
  }
}
