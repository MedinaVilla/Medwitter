import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { tap } from 'rxjs';
import { IHashtag } from 'src/app/interfaces/Hastag';
import { IResultSearch } from 'src/app/interfaces/ResultSearch';
import { UserTagService } from './services/user-tag-search.service';

@Component({
  selector: 'app-user-tag-search',
  templateUrl: './user-tag-search.component.html',
  styleUrls: ['./user-tag-search.component.css']
})
export class UserTagSearchComponent implements OnInit {

  @Input() userTagSearch!: string;
  @Output() selectUser = new EventEmitter<string>();

  userTagsResults!: IResultSearch[];
  constructor(private userTagSearchSvc: UserTagService) { }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes["userTagSearch"].currentValue) {
      this.userTagSearchSvc.getUserTagSearch(this.userTagSearch.substring(1, this.userTagSearch.length).trim()).pipe(tap(users => {
        this.userTagsResults = users;
      })).subscribe();
    }
  }

  selectOption(item: string):void{
    this.selectUser.emit(item);
  }
  
  ngOnInit(): void {

  }

}
