import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITweet } from 'src/app/interfaces/Tweet';
import { SearchPService } from '../services/search-p.service';
import { tap } from 'rxjs';
import { IUser } from 'src/app/interfaces/User';
import { UserService } from '../../profile/services/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  query!: string;
  onlyPF!: string;
  onlyNear!: string;
  src!: string;
  filter!: string;

  retweets!: any;
  likes!: any;

  people: IUser[]=[];
  tweets: ITweet[] = [];

  loading: boolean = true;

  constructor(private route: ActivatedRoute, private searchSvc: SearchPService, private userSvc: UserService, private _location: Location) {
    this.route.queryParams.subscribe(params => {
      this.query = params['q'];
      this.onlyPF = params['pf'];
      this.onlyNear = params['If'];
      this.src = params['src'];
      this.filter = params['f'];

      this.getTweetsSearch();
    });

  }

  ngOnInit(): void {

    this.getTweetsSearch();

  }

  getTweetsSearch(): void {
    let bodySearch = {
      ...(this.query) && { query: this.query },
      ...(this.onlyPF) && { pf: this.onlyPF },
      ...(this.onlyNear) && { If: this.onlyNear },
      ...(this.src) && { src: this.src },
      ...(this.filter) && { filter: this.filter },

      user: "MedinaVilla23"
    }

    this.userSvc.getUserInteraction("MedinaVilla23").pipe(tap(tweetsInteraction => {
      this.retweets = tweetsInteraction.retweet;
      this.likes = tweetsInteraction.liked;
      this.loading = false;

    })).subscribe();


    this.searchSvc.getSearchResultsP(bodySearch).pipe(tap(res => {
      this.people = res.people;
      this.tweets = res.tweets;
    })).subscribe();
  }

  goBackNavigate():void{
    this._location.back();
  }
}
