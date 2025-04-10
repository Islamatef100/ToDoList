import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegistrationService } from '../../../Services/registration.service';
import { Router } from '@angular/router';
import { User } from '../../../Models/to-do-task';
import { SigningService } from '../../../Services/signing.service';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private fb:FormBuilder , private api : RegistrationService , private router : Router, private setSigned : SigningService){}
  form!:FormGroup
  ngOnInit(){
    this.initForm()
  }
  initForm(){
    this.form = this.fb.group({
      username : ['' , [Validators.required]],
      password : ['' , [Validators.required]],
      email    : ['' , [Validators.required, Validators.email]],
      phone    : ['' , [Validators.required]],

    })

  }
  onSubmit(){
    const user : User = {...this.form.value , UserId:Date.now().toString()}
    this.api.register(user).subscribe((res)=>{
      if(!localStorage.getItem('SignedIn'))
      {
        this.setSigned.register(user.UserName!);
        localStorage.setItem('SignedIn', user.UserId);
        this.router.navigateByUrl('home')
      }
    }, (err)=>{console.log('i can not register: ' , err)})
  }
}
