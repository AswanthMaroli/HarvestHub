import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../home/services/product.service';
import { ProductRegistrationService } from '../details/services/product-registration.service';
import { Cart } from '../details/Models/cart';
import { SaveResponse } from '../../Models/SaveResponse';
import { PaymentData } from './Models/payment';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,CommonModule,RouterModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  UserID: any;
  CartData: Cart[]=[];
  SubTotal: number=0;
  PaymentData :PaymentData = new PaymentData();
  ProductRegID: any;

  constructor(private ProductService : ProductService,
    private router : Router,
    private route :ActivatedRoute,
    private ProductRegistrationService:ProductRegistrationService) {}

  ngOnInit() {
    this.UserID= JSON.parse(this.getUserID(), this.UserID);
    this.ProductRegID= JSON.parse(this.getProductRegID(), this.ProductRegID);
    this.getCart();
  }

  getUserID(): string {
    let UserID = localStorage.getItem('UserID');
    if(UserID){
      return UserID;
    }else{
      return '';
    }
     
  }

  getProductRegID(): string {
    let ProductRegID = localStorage.getItem('ProductRegID');
    if(ProductRegID){
      return ProductRegID;
    }else{
      return '';
    }
     
  }

  getCart(){
    this.ProductRegistrationService.GetCart(this.UserID).subscribe((data)=>{
      console.log('pdata',data);
      this.CartData=data;
     if( !this.CartData ){
      this.CartData=[];
     }
     else{
      this.CartData.forEach((data)=>{
         this.SubTotal +=data.NetTotal;
      })
     }
    })
  }


  async Payment(){
    this.PaymentData.ProductRegID=this.ProductRegID;
    this.PaymentData.PaymentType='CARD';
    this.PaymentData.NetTotal=this.SubTotal+40;
    this.PaymentData.ModifiedUser=this.UserID;

    console.log(this.PaymentData);
    

    await this.ProductRegistrationService.SaveOrder(this.PaymentData).subscribe((data)=>{
      console.log(data);
      let resp = new SaveResponse();
      resp=data;
     if( resp.Saved==true){
      alert("Registered!");
      this.router.navigate(['order']);
     }
    })
    
  }

}
