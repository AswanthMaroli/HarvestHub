import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Customer } from './model/Customer';
import { FormsModule } from '@angular/forms';
import { ProductRegistrationService } from '../details/services/product-registration.service';
import { SaveResponse } from '../../Models/SaveResponse';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,CommonModule,RouterModule,FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

  CustomerData : Customer= new Customer();
  UserID: any;

  constructor(private router : Router,
    private route :ActivatedRoute,
  private ProductRegistrationService : ProductRegistrationService){

  }
  ngOnInit(){
    this.UserID= JSON.parse(this.getUserID(), this.UserID);
  }

  getUserID(): string {
    let UserID = localStorage.getItem('UserID');
    if(UserID){
      return UserID;
    }else{
      return '';
    }
     
  }

  async saveCustomer(){

    debugger;
    this.CustomerData.ModifiedUser=this.UserID;
      console.log('test reg',this.CustomerData);
    
      this.ProductRegistrationService.SaveCustomer(this.CustomerData)
        .subscribe((data) => {
          console.log(data);
          let resp = new SaveResponse();
          resp = data;
          debugger;
          if (resp.Saved == true) {
            alert("Added To cart!");
            console.log('added');
           // this.ProductRegID = resp.ID;
           // localStorage.setItem('ProductRegID', JSON.stringify(this.ProductRegID));
    
            this.router.navigate(['payment']);
          }
        })
      
    
    }

}
