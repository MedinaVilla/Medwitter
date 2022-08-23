import { Component, OnInit } from '@angular/core';
import { EventService } from '../../event/services/event.service';
import { tap } from 'rxjs';
import { IEvent } from 'src/app/interfaces/Event';

/* type
  1 DIRECTO
  2 TENDENCIA NACIONAL
  3 TENDENCIA CATEGORIA
*/


@Component({
  selector: 'app-latest',
  templateUrl: './latest.component.html',
  styleUrls: ['./latest.component.css']
})
export class LatestComponent implements OnInit {

  latest!:IEvent[]

  constructor(private eventServ: EventService, ) { }

  ngOnInit(): void {
    this.eventServ.getLatestEvents().pipe(tap(events => {
      this.latest = events;
    })).subscribe();
   
  }

}
