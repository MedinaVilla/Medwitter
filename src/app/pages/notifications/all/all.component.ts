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
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {

  notifications!: INotification[];

  constructor(private notificationSvc: NotificationsService) { }

  ngOnInit(): void {
    this.notificationSvc.getNotifications("MedinaVilla23").pipe(tap(notifications => {
      this.notifications = notifications;
    })).subscribe();

  }
}
