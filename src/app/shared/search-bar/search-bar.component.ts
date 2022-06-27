import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
  host: {
    '(document:click)': 'onClick($event)',
  },
})
export class SearchBarComponent implements OnInit {

  search: string = "";
  showResults: boolean = false;

  constructor(private _eref: ElementRef) { }

  ngOnInit(): void {
  }

  showResultsHandler(): void {
    this.showResults = true;
  }

  hideResultsHandler():void{
    this.showResults = false;
  }

  onClick(event: { target: any; }) {
    if (!this._eref.nativeElement.contains(event.target)) // or some similar check
    this.showResults = false;
  }

}
