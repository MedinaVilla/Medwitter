import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IHashtag } from 'src/app/interfaces/Hastag';
import { SERVER_NAME } from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class HashtagSearchService {
  private apiURL = SERVER_NAME + '/api'; 

  constructor(private http: HttpClient) { }

  getHashtagSearch(hashtag: string): Observable<IHashtag[]> {
    console.log(hashtag)
    return this.http.get<IHashtag[]>(this.apiURL + "/hashtag?hashtag=" + hashtag);
  }
}
