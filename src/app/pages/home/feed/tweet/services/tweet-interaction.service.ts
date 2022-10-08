import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_NAME } from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class TweetInteractionService {
  private apiURL = SERVER_NAME + '/api';

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
