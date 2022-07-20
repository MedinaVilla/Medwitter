import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IList } from 'src/app/interfaces/List';

@Injectable({
  providedIn: 'root'
})
export class ListsService {

  private apiURL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getListsRecommended(username: string): Observable<IList[]> {
    return this.http.get<IList[]>(this.apiURL + "/lists?username=" + username);
  }

  getMyLists(username: string): Observable<IList[]> {
    return this.http.get<IList[]>(this.apiURL + "/my_lists?username=" + username);
  }

}
