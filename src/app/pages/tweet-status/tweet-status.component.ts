import { Component, OnInit } from '@angular/core';


interface ITweet {
  user: {
    name: string,
    username: string,
    image: string
  },
  content: {
    text: string,
    images?: string[]
    replies: number,
    retweets: {
      retweetedByMe: boolean,
      number: number
    },
    likes: {
      likedByMe: boolean,
      number: number
    }
    timeAgo: string,
    liked?: {
      name: string
    },
    retweetted?: {
      name: string
    },
    interest?: {
      name: string
    }
  }
}

@Component({
  selector: 'app-tweet-status',
  templateUrl: './tweet-status.component.html',
  styleUrls: ['./tweet-status.component.css']
})
export class TweetStatusComponent implements OnInit {

  tweet: ITweet =
    {
      user: {
        name: "José Madero",
        username: "jose_madero",
        image: "https://pbs.twimg.com/profile_images/966436438710603776/9QWK5zB8_400x400.jpg"

      },
      content: {
        text: "Tengo planes poco admirables... Deseos que exhiben desesperación... Quisiera, quisiera más la puerta, saltar. No hay otra manera",
        replies: 6,
        retweets: {
          retweetedByMe: true,
          number: 68
        },
        likes: {
          likedByMe: true,
          number: 231
        },
        timeAgo: "1h",
      }

    }
  constructor() { }

  ngOnInit(): void {
  }

}
