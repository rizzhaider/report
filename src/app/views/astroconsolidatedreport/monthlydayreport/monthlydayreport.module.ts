import { MonthlydayreportRoutingModule } from './monthlydayreport-routing.module';
import { MonthlydayreportComponent } from './monthlydayreport.component';


import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { BsDatepickerModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import {FormsModule}   from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MonthlydayreportRoutingModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    FormsModule
  ],
  declarations: [ MonthlydayreportComponent ],
  
})  
export class MonthlydayreportModule { }
