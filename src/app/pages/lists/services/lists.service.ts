import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IList } from 'src/app/interfaces/List';
import { SERVER_NAME } from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class ListsService {

  private apiURL = SERVER_NAME + '/api'; 


  constructor(private http: HttpClient) { }

  getListsRecommended(username: string): Observable<IList[]> {
    return this.http.get<IList[]>(this.apiURL + "/lists?username=" + username);
  }

  getMyLists(username: string): Observable<IList[]> {
    return this.http.get<IList[]>(this.apiURL + "/my_lists?username=" + username);
  }

  getList(idList: string): Observable<IList> {
    return this.http.get<IList>(this.apiURL + "/list?idList=" + idList);
  }

  doList(username: string, name: string, description: string, privacy: boolean, file: File): Observable<any> {
    const form = new FormData();
    form.append("fileToUpload", file)
    form.append("name", name);
    form.append("username", username);
    form.append("description", description);
    form.append("privacy", privacy.toString());


    return this.http.post<IList>(this.apiURL + "/list", form);
  }

}
