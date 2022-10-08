import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITweet } from 'src/app/interfaces/Tweet';
import { SERVER_NAME } from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  private apiURL = SERVER_NAME + '/api';

  constructor(private http: HttpClient) { }

  getFeed(username: string): Observable<ITweet[]> {
    return this.http.get<ITweet[]>(this.apiURL + "/feed?username=" + username);
  }

}
