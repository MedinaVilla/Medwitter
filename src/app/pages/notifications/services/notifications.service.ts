import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { INotification } from 'src/app/interfaces/Notification';
import { ITweet } from 'src/app/interfaces/Tweet';
import { SERVER_NAME } from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private apiURL = SERVER_NAME + '/api'; 

  constructor(private http: HttpClient) { }

  getNotifications(username:string): Observable<INotification[]> {
    return this.http.get<INotification[]>(this.apiURL + "/user/notifications?username="+username);
  }

  getNotificationsMentions(username:string): Observable<INotification[]> {
    return this.http.get<INotification[]>(this.apiURL + "/user/notifications/mentions?username="+username);
  }
}
