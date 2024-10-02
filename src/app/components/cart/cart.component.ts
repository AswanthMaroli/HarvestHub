import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Registration } from '../details/Models/Registration';
import { ProductService } from '../home/services/product.service';
import { ProductRegistrationService } from '../details/services/product-registration.service';
import { Cart } from '../details/Models/cart';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,CommonModule,FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  ProductRegID: any;
  state$: any;
  Registration : Registration = new Registration();
  CartData :Cart[]=[];
  UserID: any;

  constructor(private ProductService : ProductService,
    private router : Router,
    private route :ActivatedRoute,
    private ProductRegistrationService:ProductRegistrationService
  ){
     

  }

  async ngOnInit(){
    this.ProductRegID= JSON.parse(this.getProductRegID(), this.ProductRegID);
    this.UserID= JSON.parse(this.getUserID(), this.UserID);
   
  this.getCart();
  
  }


  getCart(){
    this.ProductRegistrationService.GetCart(this.UserID).subscribe((data)=>{
      console.log('pdata',data);
      this.CartData=data;
     if( !this.CartData ){
      this.CartData=[];
     }
    })
  }

  getProductRegID(): string {
    let ProductRegID = localStorage.getItem('ProductRegID');
    if(ProductRegID){
      return ProductRegID;
    }else{
      return '';
    }
     
  }

  getUserID(): string {
    let UserID = localStorage.getItem('UserID');
    if(UserID){
      return UserID;
    }else{
      return '';
    }
     
  }

  // async AddToCart(){

  //   debugger;
  //     this.Registration.ProductID=this.ProductID;
  //     this.Registration.Calculate(this.ProductDetails);
  //     console.log('test reg',this.Registration);
    
  //     this.ProductRegistrationService.SaveRegistration(this.Registration)
  //       .subscribe((data) => {
  //         console.log(data);
  //         let resp = new SaveResponse();
  //         resp = data;
  //         debugger;
  //         if (resp.Saved == true) {
  //           alert("Added To cart!");
  //           console.log('added');
  //           this.ProductRegID = resp.ID;
  //           localStorage.setItem('ProductRegID', JSON.stringify(this.ProductRegID));
    
  //           this.router.navigate(['cart']);
  //         }
  //       })
      
    
  //   }
}
