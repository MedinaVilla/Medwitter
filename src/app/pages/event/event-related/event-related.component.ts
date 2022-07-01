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
  selector: 'app-event-related',
  templateUrl: './event-related.component.html',
  styleUrls: ['./event-related.component.css']
})
export class EventRelatedComponent implements OnInit {
  
  tweets:ITweet[]=[
    {
      user:{
        name: "SALUD México",
        username:"SSalud_mx",
        image: "https://pbs.twimg.com/profile_images/1542628139033104388/BcirW-ML_400x400.jpg"

      },
      content:{
        text: "La Secretaría de Salud te invita a conocer más sobre el Premio Nacional de Acción Solidaria y Voluntaria",
        images:["https://pbs.twimg.com/media/FWlyIEMUsAAB-oU?format=jpg&name=4096x4096"],
        replies: 1,
        retweets:{
          retweetedByMe: false,
          number:1,
        },
        likes:{
          likedByMe: false,
          number:4
        },
        timeAgo:"01 jul 2022",
      }
    },
    {
      user:{
        name: "OPS/OMS",
        username:"opsoms",
        image: "https://pbs.twimg.com/profile_images/1096094749902028801/ijbQWupW_400x400.png"

      },
      content:{
        text: "🌎 224 millones de personas aún no han recibido una sola inyección de vacuna en nuestra región. Abracemos los medios que tenemos hoy para prevenir las peores consecuencias de COVID y ayúdenos a pasar página en esta pandemia - @DirOPSPAHO.",
        images:["https://www.paho.org/sites/default/files/styles/top_hero/public/2021-06/covid-19-vaccination-guyana-1500x799.jpg?h=ec98a0f6&itok=w31ex1Yt"],
        replies: 1,
        retweets:{
          retweetedByMe: false,
          number:129,
        },
        likes:{
          likedByMe: true,
          number:23
        },
        timeAgo: "21h",
      }
    },
    {
      user:{
        name: "OPS/OMS",
        username:"opsoms",
        image: "https://pbs.twimg.com/profile_images/1096094749902028801/ijbQWupW_400x400.png"

      },
      content:{
        text: "Durante la pandemia de COVID-19 🦠, usar tu máscara ✅ correctamente 😷 Reduce el riesgo de #COVID19. #HazloTodo para mantenerte protegido.",
        images:["https://twitter.com/i/status/1542931037902163968"],
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
      }
    },
  ];


  constructor() { }

  ngOnInit(): void {
  }

}
