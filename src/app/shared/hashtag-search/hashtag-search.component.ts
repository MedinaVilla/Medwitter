import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { HashtagSearchService } from './services/hashtag-search.service';
import { tap } from 'rxjs';
import { IHashtag } from 'src/app/interfaces/Hastag';

@Component({
  selector: 'app-hashtag-search',
  templateUrl: './hashtag-search.component.html',
  styleUrls: ['./hashtag-search.component.css']
})
export class HashtagSearchComponent implements OnInit, OnChanges {
  @Input() hashtagSearch!: string;
  @Output() selectHashtag = new EventEmitter<string>();

  hashtagResults!: IHashtag[];
  constructor(private hashtagSvc: HashtagSearchService) { }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes["hashtagSearch"].currentValue) {
      this.hashtagSvc.getHashtagSearch(this.hashtagSearch.substring(1, this.hashtagSearch.length)).pipe(tap(hashtags => {
        this.hashtagResults = hashtags;
      })).subscribe();
    }
  }

  selectOption(item: string):void{
    this.selectHashtag.emit(item);
  }
  
  ngOnInit(): void {

  }

}
