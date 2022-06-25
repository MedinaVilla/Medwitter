import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

interface IMessage {
  user: {
    name: string,
    username: string,
    image: string,
    description?:string,
    verified:boolean
  },
  lastMessage: {
    isOwn: boolean,
    date: string,
    message: string
  },
  messages: {
    isOwn: boolean,
    date:string,
    text:string
  }[]
}

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.css']
})
export class MessagesListComponent implements OnInit {
  @Output() selectedMessage = new EventEmitter<IMessage>();

  messages: IMessage[] = [
    {
      user:{
        name: "Stephen Grider",
        username:"ste.grider",
        image: "https://pbs.twimg.com/profile_images/621845465496039428/SgXekq63_400x400.jpg",
        description:"I do the computers. Courses: http://udemy.com/user/sgslo/. Email: ste.grider@gmail.com.",
        verified: false,

      },
      lastMessage:{
        isOwn: true,
        date: "26 may.",
        message:"Hola Stephen. Tomé tus cursos en MERN stack y Microfrontend y quería decirte que...",
      },
      messages:  [
        {
          isOwn: false,
          date: "24 may. 2022 12:11 a.m",
          text: "Hola Medina"
        },
        {
          isOwn: false,
          date: "24 may. 2022 12:13 a.m",
          text: "Me da mucho gusto saludarte, he visto tus proyectos y se me hacen interesantes."
        },
        {
          isOwn: true,
          date: "26 may. 2022 11:33 a.m",
          text: "Wow, mil gracias. No sabes lo importante que fuiste para mi desarrollo oprofesional"
        },
        {
          isOwn: false,
          date: "26 may. 2022 11:33 a.m",
          text: "Me alegra mucho, sigue así por este camino. React y Angular son las tecnologías que tienen un gran auge en la actualidad. Mejorar tus skills y llegarás muy lejos"
        },
        {
          isOwn: true,
          date: "26 may. 2022 11:33 a.m",
          text: "Hola Stephen. Tomé tus cursos en MERN stack y Microfrontend y quería decirte que me ha ayudado mucho a crecer en conocimiento"
        }
      ]
    },
    {
      user:{
        name: "Jose Madero",
        username:"jose_madero",
        image: "https://pbs.twimg.com/profile_images/966436438710603776/9QWK5zB8_400x400.jpg",
        description:"Cantor",
        verified: true,

      },
      lastMessage:{
        isOwn: true,
        date: "22 may.",
        message:"Haz otro concierto en el Auditorio Nacional bro, saludos"
      },
      messages:  [
        {
          isOwn: true,
          date: "22 may. 2022 11:33 a.m",
          text: "Haz otro concierto en el Auditorio Nacional bro, saludos"
        }
      ]
    },
    {
      user:{
        name: "lasso",
        username:"LassoMusica",
        image: "https://pbs.twimg.com/profile_images/1532527716464992273/ueg30g26_400x400.jpg",
        description:"tickets para la gira⬇️",
        verified: true,

      },
      lastMessage:{
        isOwn: true,
        date: "12 may.",
        message:"Me encanta tu música, sobre todo la de ibuprofeno"
      },
      messages:  [
        {
          isOwn: true,
          date: "12 may. 2022 4:11 p.m",
          text: "Me encanta tu música, sobre todo la de ibuprofeno"
        }
      ]
    },
    {
      user:{
        name: "Benny Ibarra",
        username:"bennyibarra",
        image: "https://pbs.twimg.com/profile_images/1426936466484043785/oVG9izi9_400x400.jpg",
        description:"Músico, actor y productor. 😊",
        verified:true
      },
      lastMessage:{
        isOwn: true,
        date: "26 may.",
        message:"Continuemos con la marcha de la vida"
      },
      messages:  [
        {
          isOwn: false,
          date: "11 abr. 2022 8:11 p.m",
          text: "Gracias por apoyarme en el concierto. Continúa consechando grandes éxitos."
        },
        {
          isOwn: true,
          date: "11 abr. 2022 8:11 p.m",
          text: "Gracias por apoyarme en el concierto. Continúa consechando grandes éxitos."
        }
      ]
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }
  onSelectedMessage(value: IMessage):void{
    this.selectedMessage.emit(value)
  }
  
}
