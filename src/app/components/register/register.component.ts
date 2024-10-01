import { Component } from '@angular/core';
import { Authenticate } from './Models/Authenticate';
import { FormsModule } from '@angular/forms';
import { RegisterService } from './service/register.service';
import { SaveResponse } from '../../Models/SaveResponse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  UserData : Authenticate = new Authenticate ();

  constructor(private Regservice : RegisterService,
    private router : Router
  ){}

  ngOnInit(){

  }

  async Submit(){
    await this.Regservice.SaveUser(this.UserData).subscribe((data)=>{
      console.log(data);
      let resp = new SaveResponse();
      resp=data;
     if( resp.Saved==true){
      alert("Registered!");
      this.router.navigate(['login']);
     }
    })
    
  }
}
