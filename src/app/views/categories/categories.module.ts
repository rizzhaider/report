import { AlertModule } from './../../alert/alert.module';
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import { CategoriesRoutingModule } from './categories-routing.module';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import {FormsModule}   from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    FormsModule,
    AlertModule
  ],
  declarations: [ CategoriesComponent ],
  
})  
export class CategoriesModule { }
