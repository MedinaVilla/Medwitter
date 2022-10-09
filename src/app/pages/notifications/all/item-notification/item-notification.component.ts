import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { INotification } from 'src/app/interfaces/Notification';

@Component({
  selector: 'app-item-notification',
  templateUrl: './item-notification.component.html',
  styleUrls: ['./item-notification.component.css']
})
export class ItemNotificationComponent implements OnInit {
  @Input() item!: INotification;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  goToTweet(): void {
    if (this.item.response) {
      this.router.navigate([this.item.userInteraction.username + '/status/' + this.item.response.tweetResponse]);
    } else
      this.router.navigate(['MedinaVilla23/status/' + this.item.idTweet]);
  }

  goToProfile(name:string): void {
      this.router.navigate(["/"+name]);
    } 
}
