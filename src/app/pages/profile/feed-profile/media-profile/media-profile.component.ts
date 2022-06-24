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
  selector: 'app-media-profile',
  templateUrl: './media-profile.component.html',
  styleUrls: ['./media-profile.component.css']
})
export class MediaProfileComponent implements OnInit {

  tweets: ITweet[] = [
    {
      user: {
        name: "Jesus Medina",
        username: "MedinaVilla",
        image: "./../../../../../assets/profile.jpg"

      },
      content: {
        text: "",
        images:["https://c.tenor.com/Rm_8Z-dwaBwAAAAC/feliz-jueves-asuka.gif"],
        replies: 0,
        retweets:{
          retweetedByMe: false,
          number: 1
        },
        likes:{
          likedByMe: true,
          number: 4
        },
        timeAgo: "24 dic. 2021",
      }
    },
    {
      user: {
        name: "Jesus Medina",
        username: "MedinaVilla",
        image: "./../../../../../assets/profile.jpg"

      },
      content: {
        text: "Muy difícil decisión, React y Angular tienen su manera de trabajo que se adapta al programador. ",
        images:["https://miro.medium.com/max/1400/1*lC1kj3IeXoE8Z3OCKJoWkw.jpeg"],
        replies: 0,
        retweets:{
          retweetedByMe: false,
          number: 1
        },
        likes:{
          likedByMe: true,
          number: 4
        },
        timeAgo: "24 dic. 2021",
      }
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
