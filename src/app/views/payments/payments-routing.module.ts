import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PackagesComponent } from './packages/packages.component';
import { PaymentmethodComponent } from './paymentmethods/paymentmethod.component';



const routes: Routes = [
    {
      path: '',
      data: {
        title: ''
      },
      children: [
        {
          path: 'packages',
          component: PackagesComponent,
          data: {
            title: 'Packages'
          }
        },
        {
          path: 'paymentmethods',
          component: PaymentmethodComponent,
          data: {
            title: 'Payments Method'
          }
        },
        
       
      ]
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsRoutingModule {}
