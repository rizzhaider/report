import { AlertModule } from './../../alert/alert.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DailyUpComponent } from './dailyUp.component';
import { DailyUpRoutingModule } from './dailyUp-routing.module';
import { BsDatepickerModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    DailyUpRoutingModule,
    BsDatepickerModule.forRoot(),
    AlertModule
  ],
  declarations: [ DailyUpComponent ],
  
})  
export class DailyUpModule { }
