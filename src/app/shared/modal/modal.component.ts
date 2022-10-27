import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';
import { ITweet } from 'src/app/interfaces/Tweet';
import { TweetsService } from 'src/app/pages/profile/services/tweets.service';

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

  constructor(private renderer: Renderer2, private tweetSvc: TweetsService, private toastr: ToastrService) {
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
    if (option === "All") {
      this.replieOption = "Cualquier persona puede responder"
    } else if (option === "Followers") {
      this.replieOption = "Las personas que sigues pueden responder"
    } else {
      this.replieOption = "Solo las personas que menciones pueden responder"
    }
    this.checked = option;
    this.showModalView = false;
    // this.items.push(newItem);
  }

  hideModalHandler(): void {
    this.hideModal.emit();
  }

  replyTweet(data: any): void {

    if (process.env["NODE_ENV"] !== "development") {
      this.toastr.warning('No puedes realizar Tweets... por ahora', 'Acción denegada', {
        positionClass: "toast-bottom-center",
      });
    } else {
      let media = [];
      if (data.filesPure) {
        media = data.filesPure;
      }

      this.tweetSvc.makeReplyTweet(data.filesPure, data.text, data.gif, this.tweet.idTweet.toString(), this.tweet.user.username).pipe(tap(response => {
        this.toastr.success('', 'Tu tweet se envió', {
          positionClass: "toast-bottom-center"
        });
      })).subscribe();
    }
  }
}
