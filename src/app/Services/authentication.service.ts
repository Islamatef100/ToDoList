import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Models/to-do-task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http:HttpClient) { }

  api :string = "http://localhost:3000/Users"
  isAuthenticated() :Observable<User[]>{
    return this.http.get<User[]>(this.api)
  }

}
