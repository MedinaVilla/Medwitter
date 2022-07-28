import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { ITweet } from 'src/app/interfaces/Tweet';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

export class ModalComponent implements OnInit {
  @Output() hideModal = new EventEmitter<string>();
  @Input() tweet!: ITweet;


  @ViewChild('toggleButton') toggleButton!: ElementRef;
  @ViewChild('modal') modal!: ElementRef;
  
  showNotification: boolean = false;
  showModalView: boolean = false;
  replieOption: string = "Cualquier persona puede responder";
  text: string = ""

  checked = "All";

 constructor(private renderer: Renderer2) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (this.toggleButton && this.modal) {
        if (this.toggleButton.nativeElement && this.modal.nativeElement) {
          if (!this.toggleButton.nativeElement.contains(e.target) && !this.modal.nativeElement.contains(e.target)) {
            this.showModalView = false;
          }
        }
      }
    });
  }
  ngOnInit(): void {
  }

  showOptionsView(): void {
    this.showModalView = true;
  }
  
  addItem(option: string) {
    if(option==="All"){
      this.replieOption = "Cualquier persona puede responder"
    } else if(option==="Followers"){
      this.replieOption = "Las personas que sigues pueden responder"
    } else{
      this.replieOption = "Solo las personas que menciones pueden responder"
    }
    this.checked = option;
    this.showModalView = false;
    // this.items.push(newItem);
  }

  hideModalHandler():void{
    this.hideModal.emit();
  }
}
