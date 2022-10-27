import { Component, Renderer2, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { tap } from 'rxjs';
import { MakeTweetService } from './services/make-tweet.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { isControlKey } from 'src/app/utils/Input.Validator';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-make-tweet',
  templateUrl: './make-tweet.component.html',
  styleUrls: ['./make-tweet.component.css']
})
export class MakeTweetComponent implements AfterViewInit {
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


  // @ViewChild('textarea', { static: false }) d1!: ElementRef;
  d1: any = { nativeElement: {} };
  @ViewChild('hashtag', { static: false }) h!: ElementRef;

  writingHashtag: boolean = false;
  writingWord: boolean = false;
  writingTag: boolean = false;

  hastagsWords: string[] = [];
  hashtag!: string;

  lastChar: string = '';
  lastPos: number = 0;
  actualElement: any;
  selectedSuggestion: boolean = false;

  changeTweet(event: any): void {
    let lastLetter = event.key;

    if (this.actualElement.textContent.charAt(this.actualElement.textContent.length - 1) == "#" && this.writingHashtag) {
      this.actualElement.textContent = this.actualElement.textContent.substring(0, this.actualElement.textContent.length - 1);
      this.insertTextAtCursor("#", null, false, true);
    }
    if (this.actualElement.textContent.charAt(this.actualElement.textContent.length - 1) == "@" && this.writingHashtag) {
      this.actualElement.textContent = this.actualElement.textContent.substring(0, this.actualElement.textContent.length - 1);
      this.insertTextAtCursor("@", null, false, true);
    }

    if (lastLetter == "#" || lastLetter == "@") {
      this.writingHashtag = true;
    }

    if (this.actualElement?.textContent.charAt(0) == '#' || this.actualElement?.textContent.charAt(0) == '@') {
      this.selectedSuggestion = false;
      this.writingHashtag = true;
      // this.writingWord = false;
    }

    if (!this.writingWord) {
      if (isControlKey(event, lastLetter)) { // Verifico que no sea un Control Key
        this.writingWord = true;
        this.insertTextAtCursor(lastLetter, event); // Voy a crear un span
      }

    }

    if (this.writingHashtag) {
      if (lastLetter == ' ') {
        this.writingHashtag = false;
        this.writingWord = false;
      }
    }
    if (this.actualElement.textContent == "") {
      this.d1.nativeElement.removeChild(this.actualElement);
      this.writingWord = false;
    }

    this.text = this.d1.nativeElement.textContent;
  }


  insertAfter(newNode: any, referenceNode: any) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
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


  insertTextAtCursor(text: any, event: any = null, emoji = false, isHashtag = false) {
    // this.actualElement.textContent = this.actualElement.textContent - 1;
    if (event) // Checar si es necesario evitar el ultimo texto insertado ya que sera insertado un nuevo SPAN
      event.preventDefault();

    if (emoji && this.d1.nativeElement.textContent) {
      if (emoji && (this.lastPos != this.actualElement.textContent.length && this.lastPos != 1)) {
        let firstPart = this.actualElement.textContent.substring(0, this.lastPos);
        let secondPart = this.actualElement.textContent.substring(this.lastPos, this.actualElement.textContent.length);

        this.actualElement.innerHTML = firstPart;

        let spanEmoji = document.createElement('span');
        spanEmoji.innerHTML = text;
        this.insertAfter(spanEmoji, this.actualElement);

        let spanRest = document.createElement('span');
        spanRest.innerHTML = secondPart;
        this.insertAfter(spanRest, spanEmoji);

        this.lastPos = 2;
        this.setEndOfContenteditable(spanEmoji);

      } else {
        let firstPart = this.actualElement.textContent.substring(0, this.lastPos);
        this.actualElement.innerHTML = firstPart;

        let spanEmoji = document.createElement('span');
        spanEmoji.innerHTML = text;
        this.insertAfter(spanEmoji, this.actualElement);

        this.actualElement = spanEmoji;
        this.lastPos = 2;
        this.setEndOfContenteditable(spanEmoji);

        this.writingWord = false;
      }

    } else {
      if (this.actualElement && this.d1.nativeElement.childNodes.length > 0) {
        const span = this.renderer.createElement('span');
        const textR = this.renderer.createText(text);
        isHashtag && this.renderer.addClass(span, 'hashtag');
        this.renderer.appendChild(span, textR);

        this.insertAfter(span, this.actualElement);

        this.setEndOfContenteditable(span);
      } else {
        var span = document.createElement('span');

        var selection = window.getSelection();
        var range = selection?.getRangeAt(0);

        span.innerHTML = text;
        range?.collapse();
        range?.deleteContents();
        range?.insertNode(span);
        range?.setStart(span, 0);
        range?.setEnd(span, 0);
        var selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range!);
        if (emoji) {
          this.lastPos = 2;
        }
        this.actualElement = span;
        this.setEndOfContenteditable(span);
      }
    }
  }

  getCaretCharacterOffsetWithin2() {
    let element = this.actualElement;

    var caretOffset = 0;
    var doc = element.ownerDocument || element.document;
    var win = doc.defaultView || doc.parentWindow;
    var sel;
    if (typeof win.getSelection != "undefined") {
      sel = win.getSelection();
      if (sel.rangeCount > 0) {
        var range = win.getSelection().getRangeAt(0);
        var preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(element);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        caretOffset = preCaretRange.toString().length;
      }
    } else if ((sel = doc.selection) && sel.type != "Control") {
      var textRange = sel.createRange();
      var preCaretTextRange = doc.body.createTextRange();
      preCaretTextRange.moveToElementText(element);
      preCaretTextRange.setEndPoint("EndToEnd", textRange);
      caretOffset = preCaretTextRange.text.length;
    }
    return caretOffset;
  }

  getCaretCharacterOffsetWithin = (textbox = false, element = this.d1.nativeElement) => {
    this.actualElement.focus();
    var sel = document.getSelection()!;
    // @ts-ignore
    sel.modify("extend", "backward", "paragraphboundary");
    var pos = sel.toString().length;
    if (sel.anchorNode != undefined) sel.collapseToEnd();
    return pos;
  }


  hideMenuHandler(): void {
  }


  setCaret2() {
    this.d1.nativeElement.focus();
    var range = document.createRange();
    var sel = window.getSelection();

    if (this.d1.nativeElement.textContent) {
      range.setStart(this.actualElement.childNodes[0], this.lastPos);
    } else {
      range.setStart(this.d1.nativeElement, 0);
    }

    range.collapse(true);
    sel?.removeAllRanges();
    sel?.addRange(range);
  };

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

  showLimitView(event: any): void {
    this.d1.nativeElement = event.currentTarget;
    this.d1.nativeElement.addEventListener('keyup', this.saveCaretPosition); // Every character written
    this.d1.nativeElement.addEventListener('click', this.saveCaretPosition); // Click down
    this.saveCaretPosition();

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



  saveCaretPosition = (): void => {
    var ta,
      f = window.getSelection ? window.getSelection()!.focusNode : undefined
    if (f) {
      if (f.nodeType === 1) {
        ta = f;
      } else if (f.nodeType === 3 && f.parentNode) {
        ta = f.parentNode;
      }
    }
    this.actualElement = ta;
    this.lastPos = this.getCaretCharacterOffsetWithin2();
  }


  ngAfterViewInit(): void {
  }

  makeReply(): void {
    this.onTweet.emit({ filesPure: this.filesPure, text: this.text, gif: this.gif })
    this.text = "";
    this.files = [];
    this.filesPure = [];
    this.gif = "";
    this._elementRef.nativeElement.querySelector('#textarea').innerHTML = "";
  }

  makeTweet(): void {
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

  selectOptionHandler(option: string): void {
    this.actualElement.textContent = this.actualElement.textContent.charAt(0) + option;
    this.selectedSuggestion = true;

    let spanSpace = document.createElement('span');
    spanSpace.innerHTML = "&nbsp;";
    this.insertAfter(spanSpace, this.actualElement);
    let newSpan = document.createElement('span');
    newSpan.innerHTML = " ";
    this.insertAfter(newSpan, spanSpace);

    this.setEndOfContenteditable(newSpan)
  }

  saveFiles(event: Event): void {
    const me = this;
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList = element.files!;

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
    this.setCaret2();
    this.insertTextAtCursor(String.fromCodePoint(parseInt(emoji.substring(2, emoji.length), 10)), null, true);
  }

  goToProfile():void{
    this.router.navigate(["/MedinaVilla23"])
  }
}

