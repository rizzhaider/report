import { AstroforcereportRoutingModule } from './astroforcereport-routing.module';
import { AstroforcereportComponent } from './astroforcereport.component';
import { AlertModule } from './../../alert/alert.module';


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BsDatepickerModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    AstroforcereportRoutingModule,
    BsDatepickerModule.forRoot(),
    AlertModule
  ],
  declarations: [ AstroforcereportComponent ],
  
})  
export class AstroforcereportModule { }
