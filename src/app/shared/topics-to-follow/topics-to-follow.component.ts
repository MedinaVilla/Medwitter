import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topics-to-follow',
  templateUrl: './topics-to-follow.component.html',
  styleUrls: ['./topics-to-follow.component.css']
})
export class TopicsToFollowComponent implements OnInit {

  topics: string[] = [
    "Rodolfo Pizarro", "Películas & TV", "Noticias de cine", "Javier Hernández", "Universo Marvel", "Imágenes populares",
    "Carlos Salcedo", "Noticias de música", "Tweets virales", "Tweets Divertidos", "React JS", "Angular JS", "Vue JS", "Pop", "Videos populares"
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
