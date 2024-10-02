import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './components/register/register.component';
import { DetailsComponent } from './components/details/details.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { PaymentComponent } from './components/payment/payment.component';
import { OrderdetailsComponent } from './components/orderdetails/orderdetails.component';
import { ViewordersComponent } from './components/vieworders/vieworders.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [

    {
        path:'',component:HomeComponent
      },
      {
        path:'login',component:LoginComponent
      },
      {
        path:'register',component:RegisterComponent
      },
      {
        path:'details',component:DetailsComponent
      },
      {
        path:'cart',component:CartComponent
      },

      {
        path:'checkout',component:CheckoutComponent
      },
      {
        path:'payment',component:PaymentComponent
      },

      {
        path:'order',component:OrderdetailsComponent
      },

      {
        path:'vieworders',component:ViewordersComponent
      },

      {
        path:'profile',component:ProfileComponent
      },
      

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
