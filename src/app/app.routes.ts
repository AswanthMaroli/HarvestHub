import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './components/register/register.component';
import { DetailsComponent } from './components/details/details.component';
import { CartComponent } from './components/cart/cart.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
