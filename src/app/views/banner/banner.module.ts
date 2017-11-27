
import { BannerRoutingModule } from './banner-routing.module';
import { BannerComponent } from './banner.component';
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { BsDatepickerModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import {FormsModule}   from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    BannerRoutingModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    FormsModule
  ],
  declarations: [ BannerComponent ],
  
})  
export class BannerModule { }
