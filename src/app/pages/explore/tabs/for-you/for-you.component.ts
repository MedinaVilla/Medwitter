import { Component, OnInit } from '@angular/core';

/* type
  1 DIRECTO
  2 TENDENCIA NACIONAL
  3 TENDENCIA CATEGORIA
  4 
*/

interface ITrending {
  id: string,
  type: number
  categorie: string,
  title: string,
  image?: string,
  trends?: string[],
  tweets?: string
}
@Component({
  selector: 'app-for-you',
  templateUrl: './for-you.component.html',
  styleUrls: ['./for-you.component.css']
})
export class ForYouComponent implements OnInit {

  constructor() { }


  trending:ITrending[] = [
    {
      id:"123213125124123",
      type: 1,
      categorie: "Música",
      title: "Canelo",
      // image: "https://pbs.twimg.com/semantic_core_img/1517661991879413760/oOsYy3d7?format=jpg&name=120x120",
      // trends: ["aespaLiveAtCoachella", "Harry Styles", "Coachella"]
      tweets: "18,7 mil"
    },
    {
      id:"123213125124123",
      type: 3,
      categorie: "Deportes",
      title: "Chivas",
      // trends: ["Canelo", "Chivas"]
      tweets: "1,800 mil"

    },
    {
      id:"123213125124123",
      type: 3,
      categorie: "Deportes",
      title: "Chicharito",
      // image: "https://pbs.twimg.com/semantic_core_img/1518007205408043010/sPvP39UD?format=jpg&name=120x120",
      // trends: [ "Chivas"]
      tweets: "5,7 mil"

    },
    {
      id:"123213125124123",
      type: 3,
      categorie: "Música",
      title: "Benny Ibarra",
      image: "https://leonocio.es/wp-content/uploads/2018/05/maldita-nerea.jpg",
      // trends: [ "maldita nerea", "pop", ]
    },
    {
      id:"123213125124123",
      type: 1,
      categorie: "Música",
      title: "Rocket League",
      // image: "https://pbs.twimg.com/semantic_core_img/1517661991879413760/oOsYy3d7?format=jpg&name=120x120",
      // trends: ["aespaLiveAtCoachella", "Harry Styles", "Coachella"]
      tweets: "2 mil"

    },
    {
      id:"123213125124123",
      type: 3,
      categorie: "Deportes",
      title: "Alexis Vega",
      // trends: ["Canelo", "Chivas"]
      tweets: "12,7 mil"

    },
    {
      id:"123213125124123",
      type: 3,
      categorie: "Deportes",
      title: "Chivas consigue el título en el torneo BBVA Bancomer 2022",
      // image: "https://pbs.twimg.com/semantic_core_img/1518007205408043010/sPvP39UD?format=jpg&name=120x120",
      // trends: [ "Chivas"]
      tweets: "10,1 mil"

    },
    {
      id:"123213125124123",
      type: 3,
      categorie: "Música",
      title: "Maldita Nerea anunca nueva fecha en el Auditorio Nacional",
      // image: "https://leonocio.es/wp-content/uploads/2018/05/maldita-nerea.jpg",
      // trends: [ "maldita nerea", "pop", ]
      tweets: "4,7 mil"

    }
  ];



  ngOnInit(): void {
  }

}
