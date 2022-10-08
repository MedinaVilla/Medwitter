import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IInteraction } from 'src/app/interfaces/Interaction';
import { IUser } from 'src/app/interfaces/User';
import { SERVER_NAME } from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiURL = SERVER_NAME + '/api'; 

  constructor(private http: HttpClient) { }

  getUserData(username: string, overview: string =""): Observable<IUser> {
    return this.http.get<IUser>(this.apiURL + "?username=" + username + "&overview=" + overview );
  }

  getUserInteraction(username: string): Observable<IInteraction> {
    return this.http.get<IInteraction>(this.apiURL + "/interaction?username=" + username);
  }
}
