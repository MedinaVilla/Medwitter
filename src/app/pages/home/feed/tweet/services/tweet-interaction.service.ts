import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITweet } from 'src/app/interfaces/Tweet';

@Injectable({
  providedIn: 'root'
})
export class TweetInteractionService {
  private apiURL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  doLikeTweet(tweet: any): Observable<any> {
    return this.http.post<any>(this.apiURL + "/tweet/like", {
      tweet
    });
  }

  doDislikeTweet(tweet: any): Observable<any> {
    return this.http.post<any>(this.apiURL + "/tweet/dislike", {
      tweet
    });
  }

  doRetweetTweet(tweet: any): Observable<any> {
    return this.http.post<any>(this.apiURL + "/tweet/retweet", {
      tweet
    });
  }

  doUnRetweetTweet(tweet: any): Observable<any> {
    return this.http.post<any>(this.apiURL + "/tweet/unRetweet", {
      tweet
    });
  }

}
