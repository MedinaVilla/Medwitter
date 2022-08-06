import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
  host: {
    '(document:click)': 'onClick($event)',
  },
})
export class SearchBarComponent implements OnInit {

  search: string = "";
  showResults: boolean = false;

  constructor(private _eref: ElementRef, private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if(params['q']){
        this.search = params['q']
      }
    });

   }

  ngOnInit(): void {

  }

  showResultsHandler(): void {
    this.showResults = true;
  }

  hideResultsHandler():void{
    this.showResults = false;
  }

  onClick(event: { target: any; }) {
    if (!this._eref.nativeElement.contains(event.target)) // or some similar check
    this.showResults = false;
  }

  goToSearch():void{
    this.saveSearchRecent({search: this.search})
    this.router.navigate(["/search"], { queryParams: { q: this.search} });
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


}
