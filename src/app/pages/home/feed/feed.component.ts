import { Component, OnInit, Output } from '@angular/core';

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
    retweets:{
      retweetedByMe:boolean,
      number:number
    },
    likes:{
      likedByMe: boolean,
      number:number
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
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  /*
    type: 1 = 
  */
  tweets:ITweet[]=[
    {
      user:{
        name: "Jesus Medina",
        username:"MedinaVilla",
        image: "./../../../../../assets/profile.jpg"

      },
      content:{
        text: "Dicen que las palabras se las lleva el viento, pero las dije cuando hacía buen tiempo.",
        replies: 1,
        retweets:{
          retweetedByMe: false,
          number:1,
        },
        likes:{
          likedByMe: true,
          number:4
        },
        timeAgo:"24 dic 2021",
        retweetted:{
          name: "Textos de Siri"
        }
      }
    },
    {
      user:{
        name: "Jesus Medina",
        username:"MedinaVilla",
        image: "./../../../../../assets/profile.jpg"

      },
      content:{
        text: "Te mereces a alguien que no esté dispuesto a perderte.",
        images:["https://pbs.twimg.com/media/FRE3Kq4XIAAP035?format=jpg&name=4096x4096"],
        replies: 1,
        retweets:{
          retweetedByMe: false,
          number:129,
        },
        likes:{
          likedByMe: true,
          number:23
        },
        timeAgo: "1h",
        interest:{
          name:"Música"
        }
      }
    },
    {
      user:{
        name: "Jesus Medina",
        username:"MedinaVilla",
        image: "./../../../../../assets/profile.jpg"

      },
      content:{
        text: "Tengo miedo de tener la razón, tengo miedo de tener más valor.",
        replies: 1,
        retweets:{
          retweetedByMe: false,
          number:129,
        },
        likes:{
          likedByMe: false,
          number:23
        },
        timeAgo: "1h",
        liked:{
          name:"Benny Ibarra"
        }
      }
    },
    {
      user:{
        name: "Jesus Medina",
        username:"MedinaVilla",
        image: "./../../../../../assets/profile.jpg"

      },
      content:{
        text: "Te mereces a alguien que no esté dispuesto a perderte.",
        replies: 1,
        retweets:{
          retweetedByMe: false,
          number:129,
        },
        likes:{
          likedByMe: false,
          number:23
        },
        timeAgo: "1h",
        interest:{
          name:"Con base en tus me gustas"
        }
      }
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
