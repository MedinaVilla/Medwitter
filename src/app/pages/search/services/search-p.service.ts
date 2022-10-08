import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISearchP } from 'src/app/interfaces/Search';
import { SERVER_NAME } from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class SearchPService {

  private apiURL = SERVER_NAME + '/api'; 

  constructor(private http: HttpClient) { }

  getSearchResultsP(body:Object): Observable<ISearchP> {
    return this.http.post<ISearchP>(this.apiURL + "/search", body);
  }

}
