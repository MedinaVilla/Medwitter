import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ListsService } from './services/lists.service';
import { finalize, tap } from 'rxjs';
import { IList } from 'src/app/interfaces/List';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  user!: string;
  newLists: IList[] = [];
  myLists: IList[] = [];
  fixedList: IList[] = [];

  showModalListMake: boolean = false;
  
  loadingListR: boolean = true;
  loadingListM: boolean = true;
  


  constructor(private route: ActivatedRoute, private _location: Location, private listSvc: ListsService, private router: Router) {
    this.user = this.route.snapshot.paramMap.get('user')!;
  }

  ngOnInit(): void {
    this.listSvc.getListsRecommended("MedinaVilla23").pipe(tap(lists => {
      this.newLists = lists;
      this.loadingListR = false;

    })).subscribe()

    this.listSvc.getMyLists("MedinaVilla23").pipe(tap(lists => {
      this.myLists = lists;
      let fixedLists = lists.filter((list) => list.fixed);
      this.fixedList = fixedLists;

      this.loadingListM = false;
      
    })).subscribe()
  }

  goToEvent(_id: any): void {
    this.router.navigate(['/i/lists/' + _id]);
  }

  goBackNavigate(): void {
    this._location.back();
  }

  showModalListMakeHandler():void{
    this.showModalListMake = true;
  }
  hideModalListMakeHandler():void{
    this.showModalListMake = false;
  }

}
