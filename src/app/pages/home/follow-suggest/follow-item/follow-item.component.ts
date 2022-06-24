import { Component, OnInit, Input } from '@angular/core';

interface IFollow {
  image: string,
  name: string,
  username: string,
  description?: string,
  accounts_related?: string[]
}


@Component({
  selector: 'app-follow-item',
  templateUrl: './follow-item.component.html',
  styleUrls: ['./follow-item.component.css']
})
export class FollowItemComponent implements OnInit {
  @Input() follow!:IFollow;

  constructor() { }

  ngOnInit(): void {
   
  }

}
