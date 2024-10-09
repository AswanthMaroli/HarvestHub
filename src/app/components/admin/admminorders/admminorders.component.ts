import { Component } from '@angular/core';
import { Order } from '../../orderdetails/model/order';
import { ProductRegistrationService } from '../../details/services/product-registration.service';

@Component({
  selector: 'app-admminorders',
  standalone: true,
  imports: [],
  templateUrl: './admminorders.component.html',
  styleUrl: './admminorders.component.css'
})
export class AdmminordersComponent {
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
