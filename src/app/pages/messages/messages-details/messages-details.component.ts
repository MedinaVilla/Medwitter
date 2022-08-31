import { AfterContentInit, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-messages-details',
  templateUrl: './messages-details.component.html',
  styleUrls: ['./messages-details.component.css']
})
export class MessagesDetailsComponent implements OnInit, AfterContentInit {
  @Input() selectedMessage: any;

  constructor() { }
  
  ngAfterContentInit(): void {
    let objDiv = document.getElementById("scrollWrapper")!;
    objDiv.scrollTop = 100;
  }

  ngOnInit(): void {
   
  }

}
