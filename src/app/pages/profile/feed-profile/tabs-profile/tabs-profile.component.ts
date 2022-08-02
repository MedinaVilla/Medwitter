import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tabs-profile',
  templateUrl: './tabs-profile.component.html',
  styleUrls: ['./tabs-profile.component.css']
})
export class TabsProfileComponent implements OnInit {
  user!:string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.user = this.route.snapshot.paramMap.get('user')!;

  }

}
