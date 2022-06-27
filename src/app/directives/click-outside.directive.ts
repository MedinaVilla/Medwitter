import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[appClickedOutside]'
})
export class ClickOutsideDirective {
  openClick = 0;
  constructor(private el: ElementRef) { }

  @Output() public clickedOutside = new EventEmitter();

  @HostListener('document:click', ['$event.target'])
  public onClick(target: any) {
    const clickedInside = this.el.nativeElement.contains(target);
    if (!clickedInside) {
      this.openClick = this.openClick + 1;
      if (this.openClick === 1) {

      } else
        this.clickedOutside.emit(target);
    }
  }

}