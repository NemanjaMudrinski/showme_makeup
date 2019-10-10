import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Owner } from './owner';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  private ownerUrl = "http://localhost:8080/owner"

  constructor(private httpClient: HttpClient) { }

  getLoggedUser(username: String){
    return this.httpClient.get<Owner>(this.ownerUrl + `/isLoggedIn/${username}`);
  }
}
