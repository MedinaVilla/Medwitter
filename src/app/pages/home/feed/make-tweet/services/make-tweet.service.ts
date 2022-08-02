import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MakeTweetService {
  private apiURL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  tweet(filesPure:File[], text:string, gif: string = ""): Observable<any> {
    const form = new FormData();
    filesPure.map((f)=>{
      form.append("fileToUpload[]", f)
    })
    form.append("name", "Jesus Medina");
    form.append("username", "MedinaVilla23");
    form.append("image","./../../../../../assets/profile.jpg");
    form.append("text", text);
    form.append("gif", gif);
    return this.http.post<any>(this.apiURL + "/tweet", form)
  }
}
