import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-messages-details',
  templateUrl: './messages-details.component.html',
  styleUrls: ['./messages-details.component.css']
})
export class MessagesDetailsComponent implements OnInit {
  @Input() selectedMessage:any;

  constructor() { }

  ngOnInit(): void {

  }

}
