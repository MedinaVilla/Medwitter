import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ListsService } from './services/lists.service';
import { tap } from 'rxjs';
import { IList } from 'src/app/interfaces/List';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  user!: string;
  newLists!: IList[];
  myLists!: IList[];
  fixedList!: IList[];

  // newLists: IList[] = [
  //   {
  //     image: "https://pbs.twimg.com/media/EXZ2w_qUcAMwN3x?format=png&name=240x240",
  //     topic: "Web development",
  //     user:{
  //       name: "Stephen Grider",
  //       image: "https://pbs.twimg.com/profile_images/621845465496039428/SgXekq63_400x400.jpg",
  //       username: "ste.grider"
  //     }
  //   },
  //   {
  //     image: "https://pbs.twimg.com/media/EXZ27UwVcAIcDfd?format=png&name=240x240",
  //     topic: "El Rock no ha muerto",
  //     user:{
  //       name: "MADERO",
  //       image: "https://pbs.twimg.com/profile_images/966436438710603776/9QWK5zB8_400x400.jpg",
  //       username: "jose.madero"
  //     }
  //   },
  //   {
  //     image: "https://www.ilimit.com/wp-content/uploads/2021/02/seguretat.candau.jpg",
  //     topic: "Web Security",
  //     user:{
  //       name: "Mosh",
  //       image: "https://www.filepicker.io/api/file/su7jLanLRmmanlmn5RyO",
  //       username: "moshitoo07"
  //     }
  //   }

  // ]


  constructor(private route: ActivatedRoute, private _location: Location, private listSvc: ListsService) {
    this.user = this.route.snapshot.paramMap.get('user')!;
  }

  ngOnInit(): void {
    this.listSvc.getListsRecommended("MedinaVilla23").pipe(tap(lists => {
      this.newLists = lists;
    })).subscribe()

    this.listSvc.getMyLists("MedinaVilla23").pipe(tap(lists => {
      this.myLists = lists;
      let fixedLists = lists.filter( (list) => list.fixed);
      this.fixedList = fixedLists;
    })).subscribe()
  }

  goBackNavigate(): void {
    this._location.back();
  }

}
