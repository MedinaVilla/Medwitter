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
  selector: 'app-with-replies',
  templateUrl: './with-replies.component.html',
  styleUrls: ['./with-replies.component.css']
})
export class WithRepliesComponent implements OnInit {

  tweets: ITweet[] = [
    {
      user: {
        name: "Jesus Medina",
        username: "MedinaVilla",
        image: "./../../../../../assets/profile.jpg"

      },
      content: {
        text: "Dicen que las palabras se las lleva el viento, pero las dije cuando hacía buen tiempo.",
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
        name: "José Madero",
        username: "jose_madero",
        image: "https://pbs.twimg.com/profile_images/966436438710603776/9QWK5zB8_400x400.jpg"

      },
      content: {
        text: "Tengo planes poco admirables... Deseos que exhiben desesperación... Quisiera, quisiera más la puerta, saltar. No hay otra manera",
        replies: 6,
        retweets:{
          retweetedByMe: true,
          number: 68
        },
        likes:{
          likedByMe: true,
          number: 231
        },
        timeAgo: "1h",
      }
    },
    {
      user: {
        name: "Jesus Medina",
        username: "MedinaVilla",
        image: "./../../../../../assets/profile.jpg"

      },
      content: {
        text: '"Tengo miedo de tener la razón, tengo miedo de tener más valor"',
        replies: 1,
        retweets:{
          retweetedByMe: false,
          number: 2
        },
        likes:{
          likedByMe: true,
          number: 5
        },
        timeAgo: "22 jun.",
      }
    },
    {
      user: {
        name: "Jesus Medina",
        username: "MedinaVilla",
        image: "./../../../../../assets/profile.jpg"

      },
      content: {
        text: '"Aunque quieran tomarme el pelo, pondré mis intereses primero"',
        replies: 1,
        retweets:{
          retweetedByMe: false,
          number: 0
        },
        likes:{
          likedByMe: true,
          number: 2
        },
        timeAgo: "21 jun.",
      }
    },
    {
      user: {
        name: "Jesus Medina",
        username: "MedinaVilla",
        image: "./../../../../../assets/profile.jpg"

      },
      content: {
        text: "A veces se siente que pierde su valor el oro. Pero tal vez, necesitas regresarle su valor al oro.",
        replies: 1,
        retweets:{
          retweetedByMe: false,
          number: 0
        },
        likes:{
          likedByMe: true,
          number: 1
        },
        timeAgo: "16 jun.",
      }
    },
    {
      user: {
        name: "Camilo",
        username: "CamiloMusica",
        image: "https://pbs.twimg.com/profile_images/1526240273122066433/yQ6aN-VM_400x400.jpg"

      },
      content: {
        text: "He ido a los lugares más caros, mas ricos, más finos y más elegantes, descubrí que tu cuerpo es mi lugar favorito y tu boca mi comdia favorita",
        images: ["https://pbs.twimg.com/media/FUrBXcgX0AI9qNX?format=jpg&name=large"],
        replies: 6,
        retweets:{
          retweetedByMe: true,
          number: 68
        },
        likes:{
          likedByMe: true,
          number: 231
        },
        timeAgo: "1h",
      }
    },
    {
      user: {
        name: "Jesus Medina",
        username: "MedinaVilla",
        image: "./../../../../../assets/profile.jpg"

      },
      content: {
        text: '"No, no te vayas, aún no es hora, es temprano... Nada será en vano.',
        replies: 1,
        retweets:{
          retweetedByMe: false,
          number: 0
        },
        likes:{
          likedByMe: true,
          number: 2
        },
        timeAgo: "4 jun.",
      }
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
