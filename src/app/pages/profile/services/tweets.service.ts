import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITweetInteraction } from 'src/app/interfaces/TeewtInteraction';

@Injectable({
  providedIn: 'root'
})
export class TweetsService {
  private apiURL = 'http://localhost:3000/api/user';

  constructor(private http: HttpClient) { }

  getTweetsInteraction(username: string): Observable<ITweetInteraction> {
    return this.http.get<ITweetInteraction>(this.apiURL + "/tweetsInteraction/?username=" + username);
  }
}
