import { Component, Input, OnInit } from '@angular/core';
interface IFollow {
  image: string,
  name: string,
  username: string
}

@Component({
  selector: 'app-follow-suggest',
  templateUrl: './follow-suggest.component.html',
  styleUrls: ['./follow-suggest.component.css']
})
export class FollowSuggestComponent implements OnInit {

  @Input() title!:string;

  follows: IFollow[] = [
    {
      image: "https://www.centroculturalmigueldelibes.com/assets/tortuga-1-630x630.jpg",
      name: "Maldita Nerea",
      username: "MalditaNerea"
    },
    {
      image: "https://pbs.twimg.com/profile_images/1494362514506801161/SJ4mBLnj_400x400.jpg",
      name: "DVICIO",
      username: "dvicioficial"
    },
    {
      image: "https://pbs.twimg.com/profile_images/621845465496039428/SgXekq63_400x400.jpg",
      name: "Stephen Grider",
      username: "ste_grider"
    },
    
  ];


  constructor() { }

  ngOnInit(): void {
  }

}
