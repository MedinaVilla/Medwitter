import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

interface IMessage {
  user: {
    name: string,
    username: string,
    image: string,
    description?:string,
    verified:boolean
  },
  lastMessage: {
    isOwn: boolean,
    date: string,
    message: string
  },
  messages: {
    isOwn: boolean,
    date:string,
    text:string
  }[]
}

@Component({
  selector: 'app-messages-item',
  templateUrl: './messages-item.component.html',
  styleUrls: ['./messages-item.component.css']
})
export class MessagesItemComponent implements OnInit {
  @Input() message!:IMessage;
  selectedChat:string = "";
  
  @Output() selectedMessage = new EventEmitter<IMessage>();

  constructor() { }

  ngOnInit(): void {
  }

  showContent(value:IMessage){
    this.selectedMessage.emit(value);
    this.selectedChat = value.user.username;
    console.log(this.selectedChat)
  }


}
