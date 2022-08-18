import { Component, OnInit } from '@angular/core';
import { ListsService } from 'src/app/pages/lists/services/lists.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.css']
})
export class NewListComponent implements OnInit {

  name!: string;
  text!: string;

  isCropping: boolean = false;
  file!: string;

  fileCropped!: string;

  constructor(private listSvc: ListsService) { }

  ngOnInit(): void {
  }

  saveFile(event: Event): void {
    const me = this;
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList = element.files!;

    let reader = new FileReader();
    reader.readAsDataURL(fileList[0]);
    reader.onload = function () {
      me.file = reader.result?.toString()!;
      me.isCropping = true;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  onChangeCropper(image: any): void {
    this.fileCropped = image;
  }

  cropImage(): void {
    this.isCropping = false;
  }

  async makeList(): Promise<void> {
    this.listSvc.doList("MedinaVilla23", this.name, this.text, false, this.dataUrlToFile(this.fileCropped, "LIST.png")).pipe(tap(response => {
      console.log(response);
    })).subscribe();
  }


  dataUrlToFile(dataurl: any, filename: any) {
    let arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }



  // async dataUrlToFile(dataUrl: string, fileName: string): Promise<File> {
  //   const res: Response = await fetch(dataUrl);
  //   const blob: Blob = await res.blob();
  //   return new File([blob], fileName, { type: 'image/jpg' });
  // }


}