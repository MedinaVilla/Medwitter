import { Component, OnInit } from '@angular/core';
import { EventService } from '../../event/services/event.service';
import { tap } from 'rxjs';
import { IEvent } from 'src/app/interfaces/Event';

/* type
  1 DIRECTO
  2 TENDENCIA NACIONAL
  3 TENDENCIA CATEGORIA
*/

interface ILatest {
  id: string,
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

  latest!:IEvent[]
  // latest:ILatest[] = [
  //   {
  //     id:"2432352345234",
  //     type: 1,
  //     categorie: "Música",
  //     title: "Mira los Tweets del segundo fin de semana de Coachella 2022",
  //     image: "https://pbs.twimg.com/semantic_core_img/1517661991879413760/oOsYy3d7?format=jpg&name=120x120",
  //     trends: ["aespaLiveAtCoachella", "Harry Styles", "Coachella"]
  //   },
  //   {
  //     id:"2333333345234",
  //     type: 3,
  //     categorie: "Deportes",
  //     title: "Alexis Vega",
  //     trends: ["Canelo", "Chivas"]
  //   },
  //   {
  //     id:"122323442343334",
  //     type: 3,
  //     categorie: "Deportes",
  //     title: "Chivas consigue el título en el torneo BBVA Bancomer 2022",
  //     image: "https://pbs.twimg.com/semantic_core_img/1518007205408043010/sPvP39UD?format=jpg&name=120x120",
  //     trends: [ "Chivas"]
  //   },
  //   {
  //     id:"55333422335234",
  //     type: 3,
  //     categorie: "Música",
  //     title: "Maldita Nerea anunca nueva fecha en el Auditorio Nacional",
  //     image: "https://leonocio.es/wp-content/uploads/2018/05/maldita-nerea.jpg",
  //     trends: [ "maldita nerea", "pop", ]
  //   }
  // ];

  constructor(private eventServ: EventService, ) { }

  ngOnInit(): void {
    this.eventServ.getLatestEvents().pipe(tap(events => {
      this.latest = events;
    })).subscribe();
   
  }

}
