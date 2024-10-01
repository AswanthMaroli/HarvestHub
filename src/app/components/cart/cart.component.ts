import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Registration } from '../details/Models/Registration';
import { ProductService } from '../home/services/product.service';
import { ProductRegistrationService } from '../details/services/product-registration.service';

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
  CartData :Registration[]=[];

  constructor(private ProductService : ProductService,
    private router : Router,
    private route :ActivatedRoute,
    private ProductRegistrationService:ProductRegistrationService
  ){
     

  }

  async ngOnInit(){
    this.ProductRegID= JSON.parse(this.getProductRegID(), this.ProductRegID);
   
  this.getCart();
  
  }


  getCart(){
    this.ProductRegistrationService.GetProductByRegID(this.ProductRegID).subscribe((data)=>{
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
