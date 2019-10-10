import { Injectable } from '@angular/core';
import { PersonalData } from './personal-data';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PersonalDataService {

  private personalDataUrl = "http://localhost:8080/personal-data";

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<PersonalData[]>(this.personalDataUrl);
  }

  getOne(id: String) {
    return this.http.get<PersonalData>(this.personalDataUrl+`/${id}`);
  }

  getOneByUsername(username: String) {
    return this.http.get<PersonalData>(this.personalDataUrl+`/username/${username}`);
  }

  delete(id: String) {
    return this.http.delete(this.personalDataUrl+`/${id}`);
  }

  add(personalData:PersonalData) {
    return this.http.post(this.personalDataUrl, personalData);
  }

  update(id:string, personalData:PersonalData) {
    return this.http.put(this.personalDataUrl+`/${id}`, personalData)
  }
}
