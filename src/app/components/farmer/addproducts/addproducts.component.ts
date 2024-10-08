import { Component } from '@angular/core';
import { ProductDetail } from '../../../Models/ProductDetail';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-addproducts',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,CommonModule,RouterModule,FormsModule],
  templateUrl: './addproducts.component.html',
  styleUrl: './addproducts.component.css'
})
export class AddproductsComponent {

  Product: ProductDetail = new ProductDetail();

  constructor() {

  }

  async ngOnInit() {

  }

  saveProduct() { }
}
