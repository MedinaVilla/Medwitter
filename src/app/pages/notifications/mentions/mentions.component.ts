import { Component, OnInit } from '@angular/core';


// TYPE: 
// 1. Like Tweet
// 2. Retweet Tweet
// 3. New follow
// 4. Response
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
  selector: 'app-mentions',
  templateUrl: './mentions.component.html',
  styleUrls: ['./mentions.component.css']
})
export class MentionsComponent implements OnInit {

  notificaciones: INotification[] = [
    {
      type: 4,
      response: {
        idTweet: "1",
        user: {
          username: "ste.grider",
          name: "Stephen Grider",
          profile: "https://pbs.twimg.com/profile_images/621845465496039428/SgXekq63_400x400.jpg"
        },
        to: "MedinaVilla23",
        date: "20 abr.",
        content: "Hahahaha you got it.",
        comments: 2,
        retweets: 23,
        likes: 244
      }
    },
    {
      type: 4,
      response: {
        idTweet: "1",
        user: {
          username: "ste.grider",
          name: "Stephen Grider",
          profile: "https://pbs.twimg.com/profile_images/621845465496039428/SgXekq63_400x400.jpg"
        },
        to: "MedinaVilla23",
        date: "20 abr.",
        content: "Hahahaha you got it.",
        comments: 2,
        retweets: 23,
        likes: 244
      }
    },
    {
      type: 4,
      response: {
        idTweet: "1",
        user: {
          username: "ste.grider",
          name: "Stephen Grider",
          profile: "https://pbs.twimg.com/profile_images/621845465496039428/SgXekq63_400x400.jpg"
        },
        to: "MedinaVilla23",
        date: "20 abr.",
        content: "Hahahaha you got it.",
        comments: 2,
        retweets: 23,
        likes: 244
      }
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
