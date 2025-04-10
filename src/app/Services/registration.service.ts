import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Models/to-do-task';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http : HttpClient) { }
  api :string = "http://localhost:3000/Users";
  register(user : User){
    return this.http.post(this.api, JSON.stringify(user))
  }
}
