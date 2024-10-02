import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../home/services/product.service';
import { ProductRegistrationService } from '../details/services/product-registration.service';
import { Cart } from '../details/Models/cart';

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

  constructor(private ProductService : ProductService,
    private router : Router,
    private route :ActivatedRoute,
    private ProductRegistrationService:ProductRegistrationService) {}

  ngOnInit() {
    this.UserID= JSON.parse(this.getUserID(), this.UserID);
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

}
