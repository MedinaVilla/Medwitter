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
  showGifsModal: boolean = false;


  replieOption: string = "Cualquier persona puede responder";

  text: string = ""
  files: string[] = [];
  gif!: string;
  showEmojisModal: boolean = false;

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
  }

  ngOnInit(): void {

  }

  makeTweet(): void {
    let images = [];

    console.log(this.files)
    console.log(this.gif);

    if (this.files.length > 0) {
      images = this.files;
    } else if (this.gif !== undefined) {
      console.log("NETRA");
      images.push(this.gif);
    }
    console.log(images);

    let tweet = {
      type: 1,
      user: {
        name: "Jesus Medina",
        username: "MedinaVilla23",
        image: "./../../../../../assets/profile.jpg"
      },
      content: {
        text: this.text,
        media: images
      },
      replies: []
    }

    this.makeTweetSvc.tweet(tweet).pipe(tap(response => {
      this.toastr.success('', 'Tu tweet se envió', {
        positionClass: "toast-bottom-center"
      });
      this.text = "";

    })).subscribe();
  }

  showSuccess() {

  }

  saveFiles(event: Event): void {
    const me = this;
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList = element.files!;
    if (fileList) {
      console.log("FileUpload -> files", fileList);
    }

    Array.from(fileList).forEach(file => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        me.files.push(reader.result?.toString()!);
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    });
  }

  removeFile(index: number) {
    this.files.splice(index, 1); // 2nd parameter means remove one item only
  }

  removeGif() {
    this.gif = "";
  }

  showEmojis(): void {
    this.showEmojisModal = true;
  }
  hideEmojis(): void {
    this.showEmojisModal = false;
  }

  showGifs(): void {
    this.showGifsModal = true;
  }
  hideGifs(): void {
    this.showGifsModal = false;
  }

  saveGif(gif: string) {
    this.gif = gif;
  }

  concatEmoji(emoji: string): void {
    this.text += String.fromCodePoint(parseInt(emoji.substring(2, emoji.length), 10));
  }
}
