import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import data from "./DATA";

@Component({
  selector: 'app-emojis',
  templateUrl: './emojis.component.html',
  styleUrls: ['./emojis.component.css']
})
export class EmojisComponent implements OnInit {
  @Output() selectEmoji = new EventEmitter<string>();
  emojis: string[] = [];

  constructor() { }

  async ngOnInit(): Promise<void> {
    data.map((emoji) => {
      this.emojis.push("&#" + emoji + ";");
    })
  }

  selectEmojiHandler(emoji:string):void{
    this.selectEmoji.emit(emoji);
  }


}
