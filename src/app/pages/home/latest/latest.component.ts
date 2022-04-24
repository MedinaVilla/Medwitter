import { Component, OnInit } from '@angular/core';


/* type
  1 DIRECTO
  2 TENDENCIA NACIONAL
  3 TENDENCIA CATEGORIA
*/

interface ILatest {
  type: number
  categorie: string,
  title: string,
  image?: string,
  trends?: string[]
}
@Component({
  selector: 'app-latest',
  templateUrl: './latest.component.html',
  styleUrls: ['./latest.component.css']
})
export class LatestComponent implements OnInit {

  latest:ILatest[] = [
    {
      type: 1,
      categorie: "Música",
      title: "Mira los Tweets del segundo fin de semana de Coachella 2022",
      image: "https://pbs.twimg.com/semantic_core_img/1517661991879413760/oOsYy3d7?format=jpg&name=120x120",
      trends: ["aespaLiveAtCoachella", "Harry Styles", "Coachella"]
    },
    {
      type: 3,
      categorie: "Deportes",
      title: "Alexis Vega",
      trends: ["Canelo", "Chivas"]
    },
    {
      type: 3,
      categorie: "Deportes",
      title: "Chivas consigue el título en el torneo BBVA Bancomer 2022",
      image: "https://pbs.twimg.com/semantic_core_img/1518007205408043010/sPvP39UD?format=jpg&name=120x120",
      trends: [ "Chivas"]
    }
  ];

    constructor() { }

ngOnInit(): void {
}

}
