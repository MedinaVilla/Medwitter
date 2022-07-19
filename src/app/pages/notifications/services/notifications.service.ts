import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { INotification } from 'src/app/interfaces/Notification';
import { ITweet } from 'src/app/interfaces/Tweet';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private apiURL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getNotifications(): Observable<INotification[]> {
    return this.http.get<INotification[]>(this.apiURL + "/user/notifications");
  }

  getNotificationsMentions(): Observable<INotification[]> {
    return this.http.get<INotification[]>(this.apiURL + "/user/notifications/mentions");
  }
}
