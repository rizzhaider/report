
import { AstroavailabilityreportRoutingModule } from './astroavailabilityreport-routing.module';
import { AstroavailabilityreportComponent } from './astroavailabilityreport.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BsDatepickerModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    AstroavailabilityreportRoutingModule,
    BsDatepickerModule.forRoot(),
  ],
  declarations: [ AstroavailabilityreportComponent ],
  
})  
export class AstroavailabilityreportModule { }
