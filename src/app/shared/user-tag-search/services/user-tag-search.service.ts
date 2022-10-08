import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IHashtag } from 'src/app/interfaces/Hastag';
import { IResultSearch } from 'src/app/interfaces/ResultSearch';
import { SERVER_NAME } from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class UserTagService {
  private apiURL = SERVER_NAME + '/api'; 

  constructor(private http: HttpClient) { }

  getUserTagSearch(user: string): Observable<IResultSearch[]> {
    return this.http.get<IResultSearch[]>(this.apiURL + "/search?keyword=" + user);
  }
}