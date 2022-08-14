import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import Cropper from 'cropperjs';

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.css']
})
export class ImageCropperComponent implements OnInit {


  @ViewChild("image", { static: false })
  public imageElement!: ElementRef;

  @Input("src") src! : string;
  @Output() onChangeCropper = new EventEmitter<any>();

  // public imageSource: string = this.src!;

  public imageDestination: string;
  private cropper!: Cropper;

  constructor() {
    this.imageDestination = "";
  }

  public ngAfterViewInit() {
    let me = this;
    this.cropper = new Cropper(this.imageElement.nativeElement, {
      zoomable: true,
      scalable: false,
      aspectRatio:18 / 5,
      cropBoxResizable: false,
      crop: () => {
        const canvas = this.cropper.getCroppedCanvas();
        console.log(canvas.toDataURL("image/png"))
        me.onChangeCropper.emit( canvas.toDataURL("image/png"));
      }
    });
  }

  public ngOnInit() { }

}
