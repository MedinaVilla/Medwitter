import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEvent } from 'src/app/interfaces/Event';
import { SERVER_NAME } from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiURL = SERVER_NAME + '/api';

  constructor(private http: HttpClient) { }

  getLatestEvents(): Observable<IEvent[]> {
    return this.http.get<IEvent[]>(this.apiURL + "/latest_events");
  }
  getEvent(_id: any): Observable<IEvent> {
    return this.http.get<IEvent>(this.apiURL + "/event?id="+_id);
  }
}
