import { Component } from '@angular/core';
import { ProductDetail } from '../../../Models/ProductDetail';
import { Router } from '@angular/router';
import { RegisterService } from '../../register/service/register.service';
import { Authenticate } from '../../register/Models/Authenticate';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-farmer-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './farmer-info.component.html',
  styleUrl: './farmer-info.component.css'
})
export class FarmerInfoComponent {

  UserData : Authenticate []=[];

  constructor(private Regservice : RegisterService,
    private router : Router
  ){}

 async ngOnInit(){  
      await this.GetUser();
     
   
  }

  GetUser(){
    this.Regservice.GetUserList().subscribe((data)=>{
      console.log('pdata',data);
      this.UserData=data;

      
     
     if( !this.UserData ){
      this.UserData=[];
     }
    })
  }
 
   
  }


