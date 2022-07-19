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
  // notificaciones: INotification[] = [
  //   {
  //     type: 1,
  //     tweet:
  //     {
  //       id: "1",
  //       content: "Pierde una hora por la mañana y la estarás buscando todo el día",
  //       userInteraction: {
  //         profile: "https://pbs.twimg.com/profile_images/621845465496039428/SgXekq63_400x400.jpg",
  //         username: "Stephen Grider"
  //       }
  //     }
  //   },
  //   {
  //     type: 1,
  //     tweet:
  //     {
  //       id: "2",
  //       content: '"Tengo miedo de tener la razón, tengo miedo de tener más valor"',
  //       userInteraction: {
  //         profile: "https://pbs.twimg.com/profile_images/621845465496039428/SgXekq63_400x400.jpg",
  //         username: "Stephen Grider"
  //       }
  //     }
  //   },
  //   {
  //     type: 4,
  //     response: {
  //       idTweet: "1",
  //       user: {
  //         username: "ste.grider",
  //         name: "Stephen Grider",
  //         profile: "https://pbs.twimg.com/profile_images/621845465496039428/SgXekq63_400x400.jpg"
  //       },
  //       to: "MedinaVilla23",
  //       date: "20 abr.",
  //       content: "Hahahaha you got it.",
  //       comments: 2,
  //       retweets: 23,
  //       likes: 244
  //     }
  //   },
  //   {
  //     type: 2,
  //     tweet:
  //     {
  //       id: "2",
  //       content: '"Tengo miedo de tener la razón, tengo miedo de tener más valor"',
  //       userInteraction: {
  //         profile: "https://pbs.twimg.com/profile_images/621845465496039428/SgXekq63_400x400.jpg",
  //         username: "Stephen Grider"
  //       }
  //     }
  //   },
  //   {
  //     type: 5,
  //     tweet:
  //     {
  //       id: "5",
  //       content: '"Tengo miedo de tener la razón, tengo miedo de tener más valor"',
  //       userInteraction: {
  //         profile: "https://pbs.twimg.com/profile_images/621845465496039428/SgXekq63_400x400.jpg",
  //         username: "Stephen Grider"
  //       }
  //     }
  //   },
  //   {
  //     type: 1,
  //     tweet:
  //     {
  //       id: "1",
  //       content: "No hay que más que lo que tu elijes 😬",
  //       userInteraction: {
  //         profile: "https://pbs.twimg.com/profile_images/621845465496039428/SgXekq63_400x400.jpg",
  //         username: "Stephen Grider"
  //       }
  //     }
  //   },
  //   {
  //     type: 1,
  //     tweet:
  //     {
  //       id: "1",
  //       content: '"Si regalaran vidas nuevas por olvidar, tu durarías para siempre"',
  //       userInteraction: {
  //         profile: "https://pbs.twimg.com/profile_images/621845465496039428/SgXekq63_400x400.jpg",
  //         username: "Stephen Grider"
  //       }
  //     }
  //   },
  // ]

  constructor(private notificationSvc: NotificationsService) { }

  ngOnInit(): void {
    this.notificationSvc.getNotifications().pipe(tap(notifications => {
      this.notifications = notifications;
    })).subscribe();

  }
}
