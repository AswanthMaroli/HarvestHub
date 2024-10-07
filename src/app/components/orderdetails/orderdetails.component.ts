import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductRegistrationService } from '../details/services/product-registration.service';
import { Customer } from '../checkout/model/Customer';

@Component({
  selector: 'app-orderdetails',
  standalone: true,
  imports: [],
  templateUrl: './orderdetails.component.html',
  styleUrl: './orderdetails.component.css'
})
export class OrderdetailsComponent {
  Customer: Customer=new Customer();
  UserID: any;

  constructor(private router : Router,
    private route :ActivatedRoute,
    private ProductRegistrationService:ProductRegistrationService){

  }

  ngOnInit(){
    
    this.UserID= JSON.parse(this.getUserID(), this.UserID);
    this.getContact();
    //localStorage.clear();
  }

  getUserID(): string {
    let UserID = localStorage.getItem('UserID');
    if(UserID){
      return UserID;
    }else{
      return '';
    }
     
  }
  getContact(){
    this.ProductRegistrationService.GetCustomer(this.UserID).subscribe((data)=>{
      console.log('pdata',data);
      this.Customer=data;
      if(data instanceof Array){
        this.Customer=data[0];
      }
     if( !this.Customer ){
      this.Customer=new Customer();
     }
    })
  }
}
