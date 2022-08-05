import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  query!: string;
  onlyPF!: string;
  onlyNear!: string;
  src!: string;
  filter!: string;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.query = params['q'];
      this.onlyPF = params['pf'];
      this.onlyNear = params['If'];
      this.src = params['src'];
      this.filter =  params['f'];
    });
  }

  addFilterPeople(option: number): void {
    let params: any = {
      ...(this.query) && { q: this.query },
      ...(this.onlyNear) && { If: this.onlyNear },
      ...(this.src) && { src: this.src },
      ...(this.filter) && { filter: this.filter} 
    }

    if (option == 0) {
      this.router.navigate(["/search"], { queryParams: params });
    } else {
      params.pf = "on";
      this.router.navigate(["/search"], { queryParams: params });
    }
  }

  addFilterLocation(option: number): void {
    let params: any = {
      ...(this.query) && { q: this.query },
      ...(this.onlyPF) && { pf: this.onlyPF },
      ...(this.src) && { src: this.src },
      ...(this.filter) && { filter: this.filter },
    }

    if (option == 0) {
      this.router.navigate(["/search"], { queryParams: params });
    } else {
      params.If = "on";
      this.router.navigate(["/search"], { queryParams: params });
    }
  }
}
