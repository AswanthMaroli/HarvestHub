import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { loginData } from '../../Models/loginData';
import { Users } from '../../Models/users';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { SaveResponse } from '../../Models/SaveResponse';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  password: string = '';
  email: string = '';
  loginData = new loginData();
  users: Users[] = [];
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router,
     private LoginService: LoginService
    ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async login(){

  if (this.loginForm.valid) {
    this.loginData.Email = this.loginForm.value.email;
    this.loginData.Password  = this.loginForm.value.password;
    await this.LoginService.Authenticate(this.loginData).subscribe((data)=>{
      console.log(data);
      let resp = new SaveResponse();
      resp=data;
      if( resp.Saved==true){
        alert("Login Success!");
        this.router.navigate(['']);
      }else{
        alert("Login Failed!");
      }
  })
}
}

}
