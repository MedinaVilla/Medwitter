import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IInteraction } from 'src/app/interfaces/Interaction';
import { ISearchP } from 'src/app/interfaces/Search';
import { ITweet } from 'src/app/interfaces/Tweet';
import { IUser } from 'src/app/interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class SearchPService {

  private apiURL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getSearchResultsP(body:Object): Observable<ISearchP> {
    return this.http.post<ISearchP>(this.apiURL + "/search", body);
  }

}
