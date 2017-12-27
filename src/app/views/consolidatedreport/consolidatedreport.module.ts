import { DaywisereportComponent } from './daywisereport/daywisereport.component';
import { DaywisesessionreportComponent } from './astroconsolidatedreport/daywisesessionreport/daywisesessionreport.component';
import { AstrowisereportComponent } from './astroconsolidatedreport/astrowisereport.component';
import { MonthlydayreportComponent } from './astroconsolidatedreport/monthlydayreport/monthlydayreport.component';
import { ConsolidatedreportRoutingModule } from './consolidatedreport-routing.module';
import { AlertModule } from './../../alert/alert.module';
import { TimeDurationPipe } from './../../shared/pipes/time-duration.pipe';
import { MomentModule } from 'angular2-moment';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import {FormsModule}   from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ConsolidatedreportRoutingModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    FormsModule,
    MomentModule,
    AlertModule
  ],
  declarations: [ AstrowisereportComponent, 
    MonthlydayreportComponent,DaywisesessionreportComponent, TimeDurationPipe, DaywisereportComponent ],

 
  
})  
export class ConsolidatedreportModule {
  

  

 }
