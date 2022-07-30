import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { getCategories, getGifsRelatedCategory } from 'src/app/utils/Giphy';

@Component({
  selector: 'app-giphy',
  templateUrl: './giphy.component.html',
  styleUrls: ['./giphy.component.css']
})
export class GiphyComponent implements OnInit {
  @Output() hideModal = new EventEmitter<string>();
  @Output() onFinish = new EventEmitter<string>();



  
  categories: { name: string, gif: string }[] = [];
  gifs:any[] = [];

  search!:string;

  constructor() { }

  async ngOnInit(): Promise<void> {
    let categories = await getCategories();
    categories.map((category) => {
      this.categories.push({ "name": category.name, "gif": category.gif?.images.original.url! })
    })
    console.log(this.categories);
  }

  async selectCategory(category:string):Promise<void>{
    let gifsCategory = await getGifsRelatedCategory(category);
    gifsCategory.map((gif) => {
      this.gifs.push({ "name": gif.name, "gif": gif.gif?.images.original.url! })
    })
  }

    
  hideModalHandler():void{
    this.hideModal.emit();
  }

  onFinishHandler(gif: string):void{
    this.onFinish.emit(gif);
    this.hideModalHandler();
  }

  selectGif():void{

  }

  goBackGifs():void{
    this.gifs = [];
  }
}
