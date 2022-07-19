import { Component, OnInit } from '@angular/core';
import { INotification } from 'src/app/interfaces/Notification';
import { NotificationsService } from '../services/notifications.service';
import { tap } from 'rxjs';

// TYPE: 
// 1. Like Tweet
// 2. Retweet Tweet
// 3. New follow
// 4. Response

@Component({
  selector: 'app-mentions',
  templateUrl: './mentions.component.html',
  styleUrls: ['./mentions.component.css']
})
export class MentionsComponent implements OnInit {

  notifications!: INotification[];

  constructor(private notificationSvc: NotificationsService) { }

  ngOnInit(): void {
    this.notificationSvc.getNotificationsMentions().pipe(tap(notifications => {
      this.notifications = notifications;
    })).subscribe();

  }
}
