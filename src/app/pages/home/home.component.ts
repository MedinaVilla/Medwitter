import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('textarea', { static: false }) d1!: ElementRef;
  lastPosition: number = 0;

  fixAside: boolean = false;

  @HostListener('window:scroll', ['$event'])
  doSomething(event: Event) {
    var rect = this._elementRef.nativeElement.querySelector('#aside').getBoundingClientRect();

    if (this.lastPosition > window.pageYOffset) {
      this._elementRef.nativeElement.querySelector('#aside').style.position = "absolute";
      this._elementRef.nativeElement.querySelector('#aside').style.top = "0px";
      this._elementRef.nativeElement.querySelector('#aside').style.marginTop = window.pageYOffset + "px";

    }
    else {

      var elemBottom = rect.bottom;
      var isVisible = (elemBottom < window.innerHeight);

      if (isVisible && this.lastPosition!=0) {
        this._elementRef.nativeElement.querySelector('#aside').style.position = "fixed";
        this._elementRef.nativeElement.querySelector('#aside').style.top = "-180px";
        this._elementRef.nativeElement.querySelector('#aside').style.marginTop = 0;
      }
    }
    this.lastPosition = window.pageYOffset;
  }
  constructor(private _elementRef: ElementRef) { }

  ngOnInit(): void {
  }

}
