import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToDoService } from './to-do.service';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class SigningService {

  constructor(private AllUsers:AuthenticationService) { 
    this.getCurrentUser()
    
  }
  private userName = new BehaviorSubject<string|null>(null);
  user= this.userName.asObservable();

  getCurrentUser(){
    console.log('im in get current user for first render in SigningService');
    if(localStorage.getItem('SignedIn')){
    this.AllUsers.isAuthenticated().subscribe((res)=>{
      for(var _user of res){
        if(_user.UserId == localStorage.getItem('SignedIn')){
          this.userName.next(_user.UserName!);
          console.log('current user name is: ' , _user.UserName  );
        }
      }
    },err=>console.log(err))
    }
  }
  signIn(userName:string){
    this.userName.next(null);
    this.userName.next(userName);    
  }
  register(userName:string){
    this.userName.next(userName);
  }
  signOur(){
    this.userName.next(null);
  }
}
