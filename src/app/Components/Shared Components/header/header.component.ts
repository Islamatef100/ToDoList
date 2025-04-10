import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SigningService } from '../../../Services/signing.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private logOut:SigningService){}
  SigneduserName:string | null = null;
  ngOnInit(){
     this.logOut.user.subscribe(data=>{
      this.SigneduserName = data
      console.log('user name changed to: ' , this.SigneduserName);
    });
  }
  SignOut(){
    if(localStorage.getItem('SignedIn')){
      localStorage.removeItem('SignedIn')
      this.logOut.signOur();
    }}
}
