
import { AlertService } from './../services/alert.service';
import { AlertComponent } from './alert.component';



import { NgModule, ModuleWithProviders } from '@angular/core';

import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    CommonModule,
    
  ],
  declarations: [ AlertComponent ],
  exports:[AlertComponent],
  providers:[AlertService]
 
})  
export class AlertModule {}
