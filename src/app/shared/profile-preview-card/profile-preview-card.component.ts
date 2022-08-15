import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { IUser } from 'src/app/interfaces/User';
import { UserService } from 'src/app/pages/profile/services/user.service';

@Component({
  selector: 'app-profile-preview-card',
  templateUrl: './profile-preview-card.component.html',
  styleUrls: ['./profile-preview-card.component.css']
})
export class ProfilePreviewCardComponent implements OnInit, OnChanges {
  @Input() username!: string;
  user!: IUser;

  constructor(private userSvc: UserService, private router: Router) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["username"]) {
      this.userSvc.getUserData(this.username, "MedinaVilla23").pipe(tap(user => {
        this.user = user;
      })).subscribe();
    }
  }

  ngOnInit(): void {
    
  }

  goToProfile(event: Event): void {
    event.stopPropagation();
    this.router.navigate(['/' + this.user.username]);
  }


}
