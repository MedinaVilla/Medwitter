import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-wrapper',
  templateUrl: './modal-wrapper.component.html',
  styleUrls: ['./modal-wrapper.component.css']
})
export class ModalWrapperComponent implements OnInit {
  @Output() hideModal = new EventEmitter<string>();
  @Output() onFinish = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  
  hideModalHandler():void{
    this.hideModal.emit();
  }

  onFinishHandler(gif: string):void{
    this.onFinish.emit(gif);
  }

}
