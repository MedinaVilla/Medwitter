import { Component, Renderer2, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { tap } from 'rxjs';
import { MakeTweetService } from './services/make-tweet.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-make-tweet',
  templateUrl: './make-tweet.component.html',
  styleUrls: ['./make-tweet.component.css']
})
export class MakeTweetComponent implements OnInit {
  @ViewChild('toggleButton') toggleButton!: ElementRef;
  @ViewChild('modal') modal!: ElementRef;

  showNotification: boolean = false;
  showModalView: boolean = false;
  replieOption: string = "Cualquier persona puede responder";

  text: string = ""

  checked = "All";

  constructor(private renderer: Renderer2, private makeTweetSvc: MakeTweetService, private toastr: ToastrService) {
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
  showLimitView(): void {
    this.showNotification = true;
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

  ngOnInit(): void {
  }

  makeTweet(): void {
    let tweet = {
      type: 1,
      user: {
        name: "Jesus Medina",
        username: "MedinaVilla23",
        image: "./../../../../../assets/profile.jpg"
      },
      content: {
        text: this.text
      },
      replies: []
    }

    this.makeTweetSvc.tweet(tweet).pipe(tap(response => {
      console.log(response)
      this.toastr.success('', 'Tu tweet se envió', {
        positionClass: "toast-bottom-center"
      });
      this.text = "";

    })).subscribe();
  }

  showSuccess() {
  }

}
