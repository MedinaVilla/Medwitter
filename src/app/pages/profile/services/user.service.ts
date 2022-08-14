import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IInteraction } from 'src/app/interfaces/Interaction';
import { IUser } from 'src/app/interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiURL = 'http://localhost:3000/api/user';

  constructor(private http: HttpClient) { }

  getUserData(username: string): Observable<IUser> {
    return this.http.get<IUser>(this.apiURL + "?username=" + username);
  }

  getUserInteraction(username: string): Observable<IInteraction> {
    return this.http.get<IInteraction>(this.apiURL + "/interaction?username=" + username);
  }
}
