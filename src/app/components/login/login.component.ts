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
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  password: string = '';
  email: string = '';
  loginData = new loginData();
  users: Users[] = [];
  loginForm: FormGroup;
  isValid: boolean = true;

  constructor(private formBuilder: FormBuilder, private router: Router,
    private LoginService: LoginService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['0', Validators.required],
    });
  }

  async login() {
debugger;
    if (this.loginForm.valid) {
      this.loginData.Email = this.loginForm.value.email;
      this.loginData.Password = this.loginForm.value.password;
      this.loginData.Role = this.loginForm.value.role;
      console.log(this.loginData.Role );
      
      if (this.IsValid() == false) {
        return;
      }
      await this.LoginService.Authenticate(this.loginData).subscribe((data) => {
        console.log(data);
        let resp = new SaveResponse();
        resp = data;
        if (resp.Saved == true) {
          console.log('UserID', resp.ID);
          localStorage.setItem('UserID', JSON.stringify(resp.ID));
          alert("Login Success!");
          if (this.loginData.Role == 0) {
           
            this.router.navigate(['']);
          } else {
           
            this.router.navigate(['addproduct']);
          }

        } else {
          alert("Login Failed!");
        }
      })
    }
  }

  IsValid() {
    this.isValid = true;

    this.loginData.Email = this.loginData.Email == null ||
      this.loginData.Email == undefined ||
      this.loginData.Email == ''
      ? '' : this.loginData.Email;

    this.loginData.Password = this.loginData.Password == null ||
      this.loginData.Password == undefined ||
      this.loginData.Password == ''
      ? '' : this.loginData.Password;

      this.loginData.Role  =  this.loginData.Role==null ||
                              this.loginData.Role==undefined||  
                              this.loginData.Role==0
                              ?0: this.loginData.Role;

    if (this.loginData.Password == '' || this.loginData.Email == '') {
      return this.isValid = false;
    }
    else {
      return true;
    }
  }

}
