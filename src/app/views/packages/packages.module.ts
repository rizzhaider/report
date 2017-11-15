import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { PackagesComponent } from './packages.component';
import { PackagesRoutingModule } from './packages-routing.module';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import {FormsModule}   from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    PackagesRoutingModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    FormsModule
  ],
  declarations: [ PackagesComponent ],
  
})  
export class PackagesModule { }
