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

  
  goToTweet():void{
    this.router.navigate(['MedinaVilla23/status/' + this.item.idTweet]);
  }

}
