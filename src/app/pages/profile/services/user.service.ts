import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiURL = 'http://localhost:3000/api/user';

  constructor(private http: HttpClient) { }

  getUserData(username: string): Observable<IUser> {
    return this.http.get<IUser>(this.apiURL + "?username=" + username + "&singular=1");
  }
}
