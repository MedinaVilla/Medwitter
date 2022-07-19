import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEvent } from 'src/app/interfaces/Event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiURL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getLatestEvents(): Observable<IEvent[]> {
    return this.http.get<IEvent[]>(this.apiURL + "/latest_events");
  }
  getEvent(_id: any): Observable<IEvent> {
    return this.http.get<IEvent>(this.apiURL + "/event?id="+_id);
  }
}
