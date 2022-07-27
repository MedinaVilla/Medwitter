import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MakeTweetService {
  private apiURL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  tweet(tweet:any): Observable<any> {
    return this.http.post<any>(this.apiURL + "/tweet", {
      tweet
    });
  }
}
