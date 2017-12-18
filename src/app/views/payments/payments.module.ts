import { PackagesComponent } from './packages/packages.component';
import { PaymentmethodComponent } from './paymentmethods/paymentmethod.component';
import { PaymentsRoutingModule } from './payments-routing.module';
import { AlertModule } from './../../alert/alert.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule }   from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    PaymentsRoutingModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    FormsModule,
    AlertModule
  
  ],
  declarations: [PackagesComponent, PaymentmethodComponent],
  
})  
export class PaymentsModule { }
