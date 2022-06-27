import { Component, OnInit } from '@angular/core';

interface IFollow {
  image: string,
  name: string,
  username: string,
  description?:string
}


@Component({
  selector: 'app-relevant-people',
  templateUrl: './relevant-people.component.html',
  styleUrls: ['./relevant-people.component.css']
})
export class RelevantPeopleComponent implements OnInit {

  follows: IFollow[] = [
    {
      image: "https://www.centroculturalmigueldelibes.com/assets/tortuga-1-630x630.jpg",
      name: "Maldita Nerea",
      username: "MalditaNerea",
      description: "Frases de canciones de PXNDX, José Madero, Desierto Drive, Magnolia y los no me olvides, Arthur White, Trekk, covers y colaboraciones."
    },
    
  ];


  constructor() { }

  ngOnInit(): void {
  }

}
