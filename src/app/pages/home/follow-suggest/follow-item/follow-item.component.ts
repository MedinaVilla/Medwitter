import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

interface IFollow {
  image: string,
  name: string,
  username: string,
  description?: string,
  verified?: boolean,
  accounts_related?: string[]
}


@Component({
  selector: 'app-follow-item',
  templateUrl: './follow-item.component.html',
  styleUrls: ['./follow-item.component.css']
})
export class FollowItemComponent implements OnInit {
  @Input() follow!:IFollow;

  constructor(private router: Router) { }

  ngOnInit(): void {
   
  }

  goToProfile(): void {
    this.router.navigate(['/'+this.follow.username]);
  }

}
