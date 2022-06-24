import { Component, OnInit } from '@angular/core';

interface IFollow {
  image: string,
  name: string,
  username: string,
  description?: string,
  accounts_related?: string[]
}


@Component({
  selector: 'app-follow-suggest-expanded',
  templateUrl: './follow-suggest-expanded.component.html',
  styleUrls: ['./follow-suggest-expanded.component.css']
})
export class FollowSuggestExpandedComponent implements OnInit {

  
  follows: IFollow[] = [
    {
      image: "https://www.centroculturalmigueldelibes.com/assets/tortuga-1-630x630.jpg",
      name: "Maldita Nerea",
      username: "MalditaNerea",
      description: "Quiero celebrar contigo algo muy especial: La increíble historia entre tú y yo 😍",
      accounts_related:["Chivas", "Camilo", "José Madero"]
    },
    {
      image: "https://pbs.twimg.com/profile_images/1270074389174902784/qz4P4JOd_400x400.jpg",
      name: "Cristian Medina",
      username: "Bot_JCris",
      description:""
    },
    {
      image: "https://pbs.twimg.com/profile_images/621845465496039428/SgXekq63_400x400.jpg",
      name: "Stephen Grider",
      username: "ste_grider",
      description: "I do the computers. Courses: http://udemy.com/user/sgslo/. Email: ste.grider@gmail.com."
    },
    
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
