import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResultSearch } from 'src/app/interfaces/ResultSearch';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private apiURL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getResultsSearch(search: string): Observable<IResultSearch[]> {
    return this.http.get<IResultSearch[]>(this.apiURL + "/search?keyword=" + search);
  }
}
