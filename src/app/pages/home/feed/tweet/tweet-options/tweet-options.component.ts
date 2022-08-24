import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tweet-options',
  templateUrl: './tweet-options.component.html',
  styleUrls: ['./tweet-options.component.css']
})
export class TweetOptionsComponent implements OnInit {
  @Input() tweet:any;

  constructor() { }

  ngOnInit(): void {
  }

}
