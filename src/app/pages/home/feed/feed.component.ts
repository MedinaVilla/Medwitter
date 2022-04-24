import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  /*
    type: 1 = 
  */
  tweets=[
    {
      user:{
        name: "Jesus Medina",
        username:"MedinaVilla",
        image: "https://pbs.twimg.com/profile_images/1473369626780344334/MaTlDALX_400x400.jpg"

      },
      content:{
        text: "Te mereces a alguien que no esté dispuesto a perderte.",
        replies: 1,
        retweets: 129,
        likes: 387,
        timeAgo:"42m",
        retweetted:{
          name: "Textos de Siri"
        }
      }
    },
    {
      user:{
        name: "Jesus Medina",
        username:"MedinaVilla",
        image: "https://pbs.twimg.com/profile_images/1473369626780344334/MaTlDALX_400x400.jpg"

      },
      content:{
        text: "Te mereces a alguien que no esté dispuesto a perderte.",
        images:["https://pbs.twimg.com/media/FRE3Kq4XIAAP035?format=jpg&name=4096x4096"],
        replies: 1,
        retweets: 129,
        likes: 387,
        timeAgo: "1h",
        interest:{
          name:"Música"
        }
      }
    },
    {
      user:{
        name: "Jesus Medina",
        username:"MedinaVilla",
        image: "https://pbs.twimg.com/profile_images/1473369626780344334/MaTlDALX_400x400.jpg"

      },
      content:{
        text: "Te mereces a alguien que no esté dispuesto a perderte.",
        replies: 1,
        retweets: 129,
        likes: 387,
        timeAgo: "1h",
        liked:{
          name:"Benny Ibarra"
        }
      }
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
