import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IResultSearch } from 'src/app/interfaces/ResultSearch';
import { SearchService } from '../services/search.service';
import { tap } from 'rxjs';
interface IRecent {
  search: string,
  timeAgo: string
}

@Component({
  selector: 'app-results-search',
  templateUrl: './results-search.component.html',
  styleUrls: ['./results-search.component.css'],
})
export class ResultsSearchComponent implements OnInit , OnChanges{
  @Input() search!: string;
  @Output() hideResults = new EventEmitter<string>();

  results:IResultSearch[] = [];

  recents: IRecent[] = [
    {
      search: "#MondayMotivation",
      timeAgo: "1h"
    },
    {
      search: "#Jose Madero",
      timeAgo: "2h"
    },
    {
      search: "#Youareunique",
      timeAgo: "6d"
    }
  ]

  // results: IResult[] = [
  //   {
  //     name: "#Jose Madero",
  //     type: "search"
  //   },
  //   {
  //     name: "Javier Hernández",
  //     type: "search"
  //   },
  //   {
  //     name: "Jose Madero Vizcaíno",
  //     type: "profile",
  //     profile: {
  //       image: "https://pbs.twimg.com/profile_images/966436438710603776/9QWK5zB8_400x400.jpg",
  //       name: "Jose Madero Vizcaíno",
  //       username: "jose_madero",
  //       description: "cantor"
  //     }
  //   },
  //   {
  //     name: "Jesus Medina",
  //     type: "profile",
  //     profile: {
  //       image: "./../../../assets/profile.jpg",
  //       name: "Jesus Medina",
  //       username: "MedinaVilla23",
  //       description: "Sin mentiras, ni palabras que no tengan conexión"
  //     }
  //   }
  // ]


  constructor(private svcSearch: SearchService) { }

  ngOnInit(): void {

  }
  async ngOnChanges(changes: SimpleChanges): Promise<void> {
      if(changes["search"].currentValue){
        this.svcSearch.getResultsSearch(this.search).pipe(tap(results => {
          this.results = results;
        })).subscribe()
      }
  }

  goToSearch():void{
    this.hideResults.emit();
  }
}
