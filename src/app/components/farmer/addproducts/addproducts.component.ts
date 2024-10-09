import { Component } from '@angular/core';
import { ProductDetail } from '../../../Models/ProductDetail';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../home/services/product.service';
import { SaveResponse } from '../../../Models/SaveResponse';

@Component({
  selector: 'app-addproducts',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,CommonModule,RouterModule,FormsModule],
  templateUrl: './addproducts.component.html',
  styleUrl: './addproducts.component.css'
})
export class AddproductsComponent {

  ProductDetails : ProductDetail[] = [];
  UserID: any;
  Product: ProductDetail=new ProductDetail();

  constructor(private ProductService : ProductService,
              private router : Router,
    private route :ActivatedRoute,
              ){}

  async ngOnInit(){  
   this.UserID= JSON.parse(this.getUserID(), this.UserID);
    await this.GetProducts();
  }
 
  getUserID(): string {
    let UserID = localStorage.getItem('UserID');
    if(UserID){
      return UserID;
    }else{
      return '';
    }
     
  }

  async GetProducts(){  
    await this.ProductService.GetProductsByUserID(this.UserID).subscribe((data)=>{
      console.log('pdata',data);
      this.ProductDetails=data;
     if( !this.ProductDetails ){
      this.ProductDetails=[];
     }
    })
   
}


async saveProduct(){

    debugger;
    this.Product.ModifiedUser=this.UserID;
     
   
      this.ProductService.SaveProduct(this.Product)
        .subscribe((data) => {
          console.log(data);
          let resp = new SaveResponse();
          resp = data;
          debugger;
          if (resp.Saved == true) {
            alert("Product saved!");
            console.log('added');
           // this.ProductRegID = resp.ID;
           // localStorage.setItem('ProductRegID', JSON.stringify(this.ProductRegID));
   
            //this.router.navigate(['payment']);
          }
        })
     
   
    }
}
