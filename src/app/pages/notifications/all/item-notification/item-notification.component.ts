import { Component, Input, OnInit } from '@angular/core';

interface INotification {
  type: number,
  tweet?:
  {
    id: string,
    content: string,
    userInteraction: {
      profile: string,
      username: string

    }
  },
  newFollow?: [
    {
      user: {
        profile: string,
        name: string
      }
    }]
  response?: {
    idTweet: string,
    user: {
      name: string,
      username: string,
      profile: string
    },
    to: string,
    date: string,
    content: string,
    comments: number,
    retweets: number,
    likes: number
  }
}


@Component({
  selector: 'app-item-notification',
  templateUrl: './item-notification.component.html',
  styleUrls: ['./item-notification.component.css']
})
export class ItemNotificationComponent implements OnInit {
  @Input() item!: INotification;

  constructor() { }

  ngOnInit(): void {
    console.log(this.item);

  }

}
