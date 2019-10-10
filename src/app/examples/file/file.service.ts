import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Image } from './image.model';
import { Video } from './video.module';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private imageUrl = "http://localhost:8080/image";

  public fileUrl = "http://localhost:8080/file/";

  private videoUrl = "http://localhost:8080/video";

  constructor(private httpClient: HttpClient) {

   }

   addImage(image:Image, file:File) {
    const postData = new FormData();
    if(image) {
      postData.append("image", file, file.name);
    }
    postData.append("data", JSON.stringify(image));
    return this.httpClient.post(this.imageUrl+'/add', postData);
   }

   getAllVideo() {
     return this.httpClient.get<Video[]>(this.videoUrl + `/all`)
   }

   getAll() {
    return this.httpClient.get<File[]>(this.fileUrl);
  }
}
