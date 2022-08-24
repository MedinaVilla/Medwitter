import { Component, Renderer2, OnInit, ViewChild, ElementRef, Inject, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { last, tap } from 'rxjs';
import { MakeTweetService } from './services/make-tweet.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-make-tweet',
  templateUrl: './make-tweet.component.html',
  styleUrls: ['./make-tweet.component.css']
})
export class MakeTweetComponent implements OnInit {
  @Input() replyTweet!: boolean;
  @Output() onTweet = new EventEmitter<any>();

  @ViewChild('toggleButton') toggleButton!: ElementRef;
  @ViewChild('modal') modal!: ElementRef;

  showNotification: boolean = false;
  showModalView: boolean = false;
  showGifsModal: boolean = false;

  replieOption: string = "Cualquier persona puede responder";

  text: string = ""
  files: string[] = [];
  filesPure: File[] = [];

  gif!: string;
  showEmojisModal: boolean = false;

  checked = "All";


  @ViewChild('textarea', { static: false }) d1!: ElementRef;
  @ViewChild('hashtag', { static: false }) h!: ElementRef;

  writingHashtag: boolean = false;
  writingWord: boolean = false;
  writingTag: boolean = false;

  hastagsWords: string[] = [];
  hashtag!: string;
  lastChar: string = '';

  addHashtagInput(char: string): void {
    console.log("WTF")
    const lastValue = this._elementRef.nativeElement.querySelector('#textarea').lastElementChild;
    console.log(lastValue);
    lastValue.innerHTML = lastValue.textContent.substring(0, lastValue.textContent.length - 1)
    console.log("XDDDDDDDDDDD");


    const d2 = this.renderer.createElement('span');
    const text = this.renderer.createText(char);
    this.renderer.addClass(d2, 'hashtag');
    this.renderer.listen(d2, 'click', (event) => {
      this.router.navigate(['/search'], { queryParams: { q: "#jose" } })
    })

    this.renderer.appendChild(d2, text);
    this.renderer.appendChild(this.d1.nativeElement, d2);

    this.setEndOfContenteditable(d2);
  }

  addNormalInput(char: any, isEmoji = false): void {
    let lastValue = this._elementRef.nativeElement.querySelector('#textarea').lastElementChild;
    if (lastValue && !isEmoji)
      lastValue.innerHTML = lastValue.textContent.substring(0, lastValue.textContent.length - 1)




    const d2 = this.renderer.createElement('span');
    const text = this.renderer.createText(char);
    this.renderer.appendChild(d2, text);
    this.renderer.appendChild(this.d1.nativeElement, d2);

    this.setEndOfContenteditable(d2);

  }

  handleText(event: any): void {
    let text: string = event.target.textContent;
    this.text = text;
    let lastChild = this._elementRef.nativeElement.querySelector('#textarea').lastElementChild;

    if (!lastChild) {
      this._elementRef.nativeElement.querySelector('#textarea').innerHTML = "";
      this.addNormalInput(text.charAt(text.length - 1));
    }

    if (!text) {
      this.writingHashtag = false;
    }
    if (text?.charAt(text.length - 1) == '#') {
      this.writingHashtag = false;
      this.writingWord = false;
    }
    if (this.hastagsWords.includes(text.split(' ').pop()!.trim())) {
      this.writingWord = false;
      this.writingHashtag = true;
    }

    if (this.writingHashtag) {
      this.hashtag = text.split(' ').pop()!.trim();

      if (text.charAt(text.length - 1).charCodeAt(0) == 160) {
        if (this.lastChar == "#" || this.lastChar == "@") {
          this.hashtag = "";
          this.hastagsWords.pop();
          this.writingHashtag = false;
          lastChild.innerHTML = lastChild.textContent.substring(0, lastChild.textContent.length - 1);
          this.setEndOfContenteditable(lastChild)
        } else {
          console.log("FUUUUUUUUUCK")
          this.hastagsWords.push(text.substring(text.lastIndexOf("#"), text.length - 1));
          this.hashtag = "";
          this.writingHashtag = false;
          this.writingWord = true;
          this.writingTag = false;
        }
      }
    } else {
      if (this.hastagsWords.includes(text.split(' ').pop()!.trim()) && this.hashtag) {
        this.writingHashtag = true;
        this.writingTag = false;
        let newLastChild = this._elementRef.nativeElement.querySelector('#textarea').lastElementChild;
        newLastChild.innerHTML = newLastChild.textContent.substring(0, newLastChild.textContent.length - 1)
        newLastChild.innerHTML = newLastChild.textContent + " ";
        this.setEndOfContenteditable(lastChild)
      }
      else {
        let lastChar = text.charAt(text.length - 1);
        if (lastChar == '#') {
          this.addHashtagInput(text.charAt(text.length - 1));
          this.writingHashtag = true;
        } if (lastChar == '@') {
          this.addHashtagInput(text.charAt(text.length - 1));
          this.writingHashtag = true;
          this.writingTag = true;

        } else {
          if (this.writingWord) {
            this.addNormalInput(text.charAt(text.length - 1));
            this.writingWord = false;
            this.writingTag = false;
          }
        }
      }
    }
    // console.log("Writing Hashtag: " + this.writingHashtag + " WritingTag: " + this.writingTag + " WritingWord: " + this.writingWord)
    this.lastChar = text.charAt(text.length - 1)
  }

  selectOptionHandler(option: string): void {
    let type = "#";
    if (this.writingTag) {
      type = "@";
    }

    this.hashtag = "";
    this.writingHashtag = false;
    this.writingWord = true;
    this.hastagsWords.push(type + option);
    let lastChild = this._elementRef.nativeElement.querySelector('#textarea').lastElementChild;
    lastChild.innerHTML = type + option;

    this.setEndOfContenteditable(lastChild)
  }

  setEndOfContenteditable(contentEditableElement: Node) {
    let range, selection;
    if (document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
    {
      range = document.createRange();//Create a range (a range is a like the selection but invisible)
      range.selectNodeContents(contentEditableElement);//Select the entire contents of the element with the range
      range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
      selection = window.getSelection();//get the selection object (allows you to change selection)
      selection!.removeAllRanges();//remove any selections already made
      selection!.addRange(range);//make the range you have just created the visible selection
    }
  }

  constructor(private renderer: Renderer2, private makeTweetSvc: MakeTweetService, private toastr: ToastrService, private router: Router, private _elementRef: ElementRef) {
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
    if (this.files.length > 0) {

    } else if (this.gif !== undefined) {
      // images.push(this.gif);
    }


    this.makeTweetSvc.tweet(this.filesPure, this.text, this.gif).pipe(tap(response => {
      this.toastr.success('', 'Tu tweet se envió', {
        positionClass: "toast-bottom-center"
      });
      this.text = "";
      this.files = [];
      this.filesPure = [];
      this.gif = "";
      this._elementRef.nativeElement.querySelector('#textarea').innerHTML = "";


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
      this.filesPure.push(file);

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
    // this.text += String.fromCodePoint(parseInt(emoji.substring(2, emoji.length), 10));
    this.addNormalInput(String.fromCodePoint(parseInt(emoji.substring(2, emoji.length), 10)), true);
  }
}
