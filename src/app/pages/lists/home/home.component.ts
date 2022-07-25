import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { EventService } from '../../event/services/event.service';
import { ListsService } from '../services/lists.service';
import { IList } from 'src/app/interfaces/List';
import { UserService } from '../../profile/services/user.service';

@Component({
  selector: 'app-homeList',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeListComponent implements OnInit {

  list!:IList;
  retweets: any;
  likes: any;


  constructor(private listSvc: ListsService, private userSvc: UserService, private _location: Location, private route: ActivatedRoute, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    // this.route.params.subscribe(
    //   (params: Params) => {
    //     this.getEventDetail(params['idEvent'])

    //   })
  }

  ngOnInit(): void {
    let _id = this.route.snapshot.paramMap.get('idList');
    this.getListDetail(_id);
  }

  getListDetail(_id: any): void {
    
    this.listSvc.getList(_id).pipe(tap(list => {
      this.list = list;
      console.log(list);
    })).subscribe();

    this.userSvc.getUserInteraction("MedinaVilla23").pipe(tap(interaction => {
      this.retweets = interaction.retweet;
      this.likes = interaction.liked;
    })).subscribe();
  }

  goBackNavigate(): void {
    this._location.back();
  }

}
