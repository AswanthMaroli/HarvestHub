import { Component } from '@angular/core';
import { ProductRegistrationService } from '../details/services/product-registration.service';
import { Order } from '../orderdetails/model/order';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-vieworders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vieworders.component.html',
  styleUrl: './vieworders.component.css'
})
export class ViewordersComponent {
  OrderData: Order[]=[];

  constructor( private ProductRegistrationService:ProductRegistrationService){

  }

  ngOnInit(){
    this.getOrders();
    localStorage.clear();
  }

  getOrders(){ 
    this.ProductRegistrationService.GetOrderList().subscribe((data)=>{
      console.log('pdata',data);
      this.OrderData=data;
      
     if( !this.OrderData ){
      this.OrderData=[];
     }
    })
  }

}
