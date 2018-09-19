import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from '../customer/customer.component';
import { AddCustomerComponent } from '../add-customer/add-customer.component';
import { CustomerDetailsComponent } from '../customer-details/customer-details.component';

const routes: Routes = [
  {
    path: 'customers',
    component: CustomerComponent
  },
  {
    path: 'customer/add',
    component: AddCustomerComponent
  },
  {
    path: 'customers/:id',
    component: CustomerDetailsComponent
  },
  {
    path: '',
    redirectTo: 'customers',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
