import { Component, Input, OnInit } from '@angular/core';

interface IRecent{
  search: string,
  timeAgo: string
}

interface IResult{
  name: string,
  type:string,
  profile?:{
    image:string,
    name: string,
    username:string,
    description:string
  }
}

@Component({
  selector: 'app-results-search',
  templateUrl: './results-search.component.html',
  styleUrls: ['./results-search.component.css']
})
export class ResultsSearchComponent implements OnInit {
  @Input() search!:string;

  recents:IRecent[]=[
    {
      search:"#MondayMotivation",
      timeAgo:"1h"
    },
    {
      search:"#Jose Madero",
      timeAgo:"2h"
    },
    {
      search:"#Youareunique",
      timeAgo:"6d"
    }
   ]

   results:IResult[]=[
    {
      name:"#Jose Madero",
      type:"search"
    },
    {
      name:"Javier Hernández",
      type:"search"
    },
    {
      name:"Jose Madero Vizcaíno",
      type:"profile",
      profile:{
        image:"https://pbs.twimg.com/profile_images/966436438710603776/9QWK5zB8_400x400.jpg",
        name: "Jose Madero Vizcaíno",
        username:"jose_madero",
        description:"cantor"
      }
    },
    {
      name:"Jesus Medina",
      type:"profile",
      profile:{
        image:"https://pbs.twimg.com/profile_images/1473369626780344334/MaTlDALX_400x400.jpg",
        name: "Jesus Medina",
        username:"MedinaVilla23",
        description:"Sin mentiras, ni palabras que no tengan conexión"
      }
    }
   ]
  

  constructor() { }

  ngOnInit(): void {

  }

}
