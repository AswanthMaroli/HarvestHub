import { Component } from '@angular/core';
import { ProductDetail } from '../../Models/ProductDetail';
import { map, Observable } from 'rxjs';
import { Registration } from './Models/Registration';
import { ActivatedRoute, Router } from '@angular/router';
import { SaveResponse } from '../../Models/SaveResponse';
import { ProductService } from '../home/services/product.service';
import { ProductRegistrationService } from './services/product-registration.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {

  ProductDetails: ProductDetail = new ProductDetail();
  ProductID: number = 0;
  state$: Observable<any> | undefined;
  Registration: Registration = new Registration();
  ProductRegID: any;
  UserID: any;
  ProductRegDetails: Registration[] = [];

  constructor(private ProductService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private ProductRegistrationService: ProductRegistrationService
  ) {
    this.state$ = this.route.paramMap.pipe(map(() => window.history.state),);
    // platformLocation.onPopState(() => {});

  }

  async ngOnInit() {
    await this.state$?.subscribe((params) => {
      if (params.ProductID !== null && params.ProductID !== undefined && params.ProductID > 0) { this.ProductID = parseInt(params.ProductID); }
      //console.log('ProductID', this.ProductID); // ProductID }); 
    });

    this.UserID = JSON.parse(this.getUserID(), this.UserID);
    const productRegIDString = this.getProductRegID();
    if (productRegIDString) {
        try {
            this.ProductRegID = JSON.parse(productRegIDString);
        } catch (error) {
            console.error('Error parsing JSON:', error);
            this.ProductRegID = 0; // Default value in case of error
        }
    } else {
        this.ProductRegID = 0; // Default value if the string is empty or null
    }
    this.Registration.Quantity=0;
    console.log('ProductID',this.ProductID);
    console.log('UserID',this.UserID);
    console.log('ProductRegID',this.ProductRegID );
    
    if (this.ProductID && this.ProductID > 0) {
      await this.GetProductDetails();
    }


    if (this.ProductRegID && this.ProductRegID > 0) {
      await this.GetProductDetailsByRegID();
      this.Registration.Quantity=0;
    }
  }

  getProductRegID(): string {
    let ProductRegID = localStorage.getItem('ProductRegID');
    if (ProductRegID) {
      return ProductRegID;
    } else {
      this.ProductRegID=0;
      return '';
    }

  }

  getUserID(): string {
    let UserID = localStorage.getItem('UserID');
    if (UserID) {
      return UserID;
    } else {
      return '';
    }

  }



  async GetProductDetails() {
    await this.ProductService.GetProductByID(this.ProductID).subscribe((data) => {
      console.log('pdata', data);

      this.ProductDetails = data;
      if (data instanceof Array) {
        this.ProductDetails = data[0];
      }
      if (!this.ProductDetails) {
        this.ProductDetails = new ProductDetail();
      }
    })

  }

  async AddToCart() {

    debugger;
    this.Registration.ProductID = this.ProductID;
    this.Registration.ModifiedUser = this.UserID;
    if(this.ProductRegID){
      this.Registration.ProductRegID = this.ProductRegID;
    }
   // this.Registration.Calculate(this.ProductDetails);
    this.Registration.NetTotal=this.ProductDetails.Price*this.Registration.Quantity;
    console.log('test reg', this.Registration);

    this.ProductRegistrationService.SaveRegistration(this.Registration)
      .subscribe((data) => {
        console.log(data);
        let resp = new SaveResponse();
        resp = data;
        debugger;
        if (resp.Saved == true) {
          alert("Added To cart!");
          console.log('added');
          this.ProductRegID = resp.ID;
          localStorage.setItem('ProductRegID', JSON.stringify(this.ProductRegID));

          this.router.navigate(['cart']);
        }
      })


  }


  async GetProductDetailsByRegID() {
    await this.ProductRegistrationService.GetProductByRegID(this.ProductRegID).subscribe((data) => {
      console.log('prdata', data);

      this.ProductRegDetails = data;
      if(data){
         this.ProductRegDetails.forEach((data) => {
         if( data.ProductID == this.ProductID && this.ProductRegID==data.ProductRegID){
          this.Registration=data;
         }
        });
      }
      
      if (!this.ProductDetails) {
        this.ProductRegDetails = [];
        this.Registration = new Registration();
      }
    })

  }

}
