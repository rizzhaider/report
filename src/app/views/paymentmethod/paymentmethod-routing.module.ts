import { PaymentmethodComponent } from './paymentmethod.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: PaymentmethodComponent,
    data: {
      title: 'Payment Method'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentmethodRoutingModule {}
