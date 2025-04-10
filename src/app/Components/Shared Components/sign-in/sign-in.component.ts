import { NgIf } from '@angular/common';
import { Component, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../Services/authentication.service';
import { Router } from '@angular/router';
import { SigningService } from '../../../Services/signing.service';

@Component({
  selector: 'app-sign-in',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  constructor(private fb : FormBuilder , private api:AuthenticationService , private router :Router ,private setUsername : SigningService){}
  form! : FormGroup;
  ngOnInit(){
    this.initForm()
  }
  initForm(){
    this.form = this.fb.group({
      email: ['' ,[ Validators.email ,Validators.required]],
      password: ['', Validators.required]
    })
  }
  onSubmit(){
    this.api.isAuthenticated().subscribe((res)=>{
      localStorage.removeItem('SignedIn');
      for(const user of res){
        if(user.email == this.form.get('email')?.value && user.password == this.form.get('password')?.value )
        {
            if(!localStorage.getItem('SignedIn')){
              this.setUsername.signIn(user.UserName!)
              localStorage.setItem('SignedIn' , user.UserId);
              this.router.navigateByUrl('home');
              break;
             
          }
        }
      }
    } , (err)=>{console.log("user not authenticated and auth value is: " )})

  }
}
