import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { EventService } from './services/event.service';
import { tap } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IEvent } from 'src/app/interfaces/Event';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  event!: IEvent;

  constructor(private eventServ: EventService, private _location: Location, private route: ActivatedRoute, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    // this.route.params.subscribe(
    //   (params: Params) => {
    //     this.getEventDetail(params['idEvent'])

    //   })
  }

  ngOnInit(): void {
    let _id = this.route.snapshot.paramMap.get('idEvent');
    this.getEventDetail(_id);
  }

  getEventDetail(_id: any): void {
    this.eventServ.getEvent(_id).pipe(tap(event => {
      console.log(event);
      this.event = event;
    })).subscribe();
  }

  goBackNavigate(): void {
    this._location.back();
  }

}
