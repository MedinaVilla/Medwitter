import { Component, OnInit } from '@angular/core';

interface IMessage {
  user: {
    name: string,
    username: string,
    image: string,
    description?:string
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
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  selectedMessage!:IMessage;

  constructor() { }

  ngOnInit(): void {
  }

  showChat(value:IMessage):void{
    this.selectedMessage = value;
  }

}
