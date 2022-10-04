import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITweetInteraction } from 'src/app/interfaces/TeewtInteraction';
import { ITweet } from 'src/app/interfaces/Tweet';

@Injectable({
  providedIn: 'root'
})
export class TweetsService {
  private apiURL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getTweet(username: string, idTweet: number): Observable<ITweet> {
    return this.http.get<ITweet>(this.apiURL + "/tweet?username=" + username + "&idTweet=" + idTweet);
  }

  getTweetsInteraction(username: string): Observable<ITweetInteraction> {
    return this.http.get<ITweetInteraction>(this.apiURL + "/user/tweetsInteraction/?username=" + username);
  }
  getTweetsLiked(username: string): Observable<ITweet[]> {
    return this.http.get<ITweet[]>(this.apiURL + "/user/tweetsInteraction/tweets/liked?username=" + username);
  }
  getTweetsWithReplies(username: string): Observable<ITweet[]> {
    return this.http.get<ITweet[]>(this.apiURL + "/user/tweetsInteraction/tweets/w/replies?username=" + username);
  }

  getTweetsWithMedia(username: string): Observable<ITweet[]> {
    return this.http.get<ITweet[]>(this.apiURL + "/user/tweetsInteraction/tweets/w/media?username=" + username);
  }

  getRepliesTweet(username: string, idTweet: number): Observable<ITweet> {
    return this.http.get<ITweet>(this.apiURL + "/tweet/w/replies?username=" + username + "&idTweet=" + idTweet);
  }

  makeReplyTweet(filesPure:any, text:string, gif:any, idTweet:string, username:string): Observable<any> {

    const form = new FormData();
    filesPure.map((f:any)=>{
      form.append("fileToUpload[]", f)
    })
    form.append("name", "Jesus Medina");
    form.append("username", "MedinaVilla23");
    form.append("image","./../../../../../assets/profile.jpg");
    form.append("text", text);
    form.append("gif", gif);
    form.append("idTweet", idTweet)
    form.append("usernameTo", username);

    return this.http.post<any>(this.apiURL + "/tweet/replie", form)

  }

}
