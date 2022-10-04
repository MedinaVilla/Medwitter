import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IResultSearch } from 'src/app/interfaces/ResultSearch';
import { SearchService } from '../services/search.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-results-search',
  templateUrl: './results-search.component.html',
  styleUrls: ['./results-search.component.css'],
})
export class ResultsSearchComponent implements OnInit, OnChanges {
  @Input() search!: string;
  @Output() hideResults = new EventEmitter<string>();

  results: IResultSearch[] = [];
  recents: IResultSearch[] = [];

  constructor(private svcSearch: SearchService, private router: Router) { }

  ngOnInit(): void {
    let recents = JSON.parse(localStorage.getItem("recent_searchs")!);
    if (recents) {
      this.recents = JSON.parse(localStorage.getItem("recent_searchs")!);
    }
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (changes["search"].currentValue) {
      this.svcSearch.getResultsSearch(this.search).pipe(tap(results => {
        this.results = results;
      })).subscribe()
    }
  }

  goToSearch(search: string): void {
    // this.hideResults.emit();
    this.saveSearchRecent({ search: search });
    this.router.navigate(["/search"], { queryParams: { q: search } });
  }

  goToProfile(result: any): void {
    this.saveSearchRecent(result);
    this.router.navigate(["/" + result.user?.username!]);
  }

  deleteSearch(search: any, event: Event): void {

    event.stopPropagation();
    let searchs = JSON.parse(localStorage.getItem("recent_searchs")!);
    const position = searchs?.findIndex((s: any) => JSON.stringify(s) == JSON.stringify(search));
    if (position != -1) {
      searchs.splice(position, 1);
      localStorage.setItem("recent_searchs", JSON.stringify(searchs))
      this.recents.splice(position, 1)
    }
  }

  saveSearchRecent(search: any): void {
    let searchs = JSON.parse(localStorage.getItem("recent_searchs")!);
    if (!searchs?.find((s: any) => JSON.stringify(s) == JSON.stringify(search)) && searchs) { // Si no esta aún en las búsquedas recientes
      searchs.unshift(search);
      localStorage.setItem("recent_searchs", JSON.stringify(searchs))
    } else {
      if (searchs) {
        let filtered = searchs.filter((f: any) => { return JSON.stringify(f) != JSON.stringify(search) });
        filtered.unshift(search)
        localStorage.setItem("recent_searchs", JSON.stringify(filtered));
      } else {
        localStorage.setItem("recent_searchs", JSON.stringify([search]));
      }
    }
  }

  deleteSearchRecent(): void {
    this.recents = [];
    this.results = [];
    localStorage.removeItem("recent_searchs");
  }

}
