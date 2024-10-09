import { Component } from '@angular/core';
import { ProductDetail } from '../../../Models/ProductDetail';
import { Router } from '@angular/router';
import { ProductService } from '../../home/services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-allproducts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './allproducts.component.html',
  styleUrl: './allproducts.component.css'
})
export class AllproductsComponent {
  ProductDetails : ProductDetail[] = [];
  constructor(
    private ProductService : ProductService,
              private router : Router,
              ){}

  async ngOnInit(){  
   
    await this.GetProducts();
  }

  async GetProducts(){
    await this.ProductService.GetProducts().subscribe((data)=>{
      console.log('pdata',data);
      this.ProductDetails=data;
     if( !this.ProductDetails ){
      this.ProductDetails=[];
     }
    })
   
}
}
