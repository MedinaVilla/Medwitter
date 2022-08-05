import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tabs-search',
  templateUrl: './tabs-search.component.html',
  styleUrls: ['./tabs-search.component.css']
})
export class TabsSearchComponent implements OnInit {
  params!: any;

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      let oldParams =  {
        ...(params['q']) && { q: params['q'] },
        ...(params['pf']) && { pf: params['pf'] },
        ...(params['If']) && { If: params['If'] },
        ...(params['src']) && { src: params['src'] },
      }
      
      this.params = {
        base: {...oldParams},
        recent: {...oldParams, f: "recent"},
        user: {...oldParams, f: "user"},
        media: {...oldParams, f: "media"},
        video: {...oldParams, f: "video"}
      }
    });
  }


  ngOnInit(): void {
  }

}
