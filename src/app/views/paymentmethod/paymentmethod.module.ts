
import { PaymentmethodRoutingModule } from './paymentmethod-routing.module';
import { PaymentmethodComponent } from './paymentmethod.component';
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
    PaymentmethodRoutingModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    FormsModule,
    AlertModule,
   
  ],
  declarations: [ PaymentmethodComponent ],
  
})  
export class PaymentmethodModule { }
