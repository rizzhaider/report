import { AstroconsolidatedreportRoutingModule } from './astroconsolidatedreport-routing.module';
import { AstroconsolidatedreportComponent } from './astroconsolidatedreport.component';
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { BsDatepickerModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import {FormsModule}   from '@angular/forms';
import { MonthlydayreportComponent } from './monthlydayreport/monthlydayreport.component';
@NgModule({
  imports: [
    CommonModule,
    AstroconsolidatedreportRoutingModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    FormsModule
  ],
  declarations: [ AstroconsolidatedreportComponent, MonthlydayreportComponent ],
  
})  
export class AstroconsolidatedreportModule {
  

  

 }
