import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from './client'

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  public clientUrl = "http://localhost:8080/client";

  constructor(private httpClient: HttpClient) {

   }

   getAll() {
    return this.httpClient.get<Client[]>(this.clientUrl + `/all`);
  }

  getOne(id: String) {
    return this.httpClient.get<Client>(this.clientUrl+`/${id}`);
  }

  getOneByUsername(username: String) {
    return this.httpClient.get<Client>(this.clientUrl+`/username/${username}`);
  }

  delete(id: String) {
    return this.httpClient.delete(this.clientUrl+`/${id}`);
  }

  add(client:Client, image:File) {
    const postData = new FormData();
    if(image) {
      postData.append("profileImage", image, image.name);
    }
    postData.append("data", JSON.stringify(client));
    return this.httpClient.post(this.clientUrl+'/register', postData);
  }

  update(username:string, client:Client, image:File) {
    const postData = new FormData();
    if(image) {
      postData.append("profileImage", image, image.name);
    }
    postData.append("data", JSON.stringify(client));
    return this.httpClient.put(this.clientUrl+`/${username}`, postData)
  }

  getLoggedUser(username: String){
    return this.httpClient.get<Client>(this.clientUrl + `/isLoggedIn/${username}`);
  }
}
