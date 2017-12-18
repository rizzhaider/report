import { AlertService } from './../../services/alert.service';
import { AstroAvailabilityReport } from './../../shared/model/astro-availability-report.model';

import { AstroavailabilityService } from './../../services/astroavailability.service';

import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
@Component({
  templateUrl: 'astroavailabilityreport.component.html'
})
export class AstroavailabilityreportComponent implements OnInit {
  public astroAvailabilityreport:AstroAvailabilityReport;
  loading : boolean = false;;
  bsValue: Date;
  maxDate: Date;
 
  bsValueStr: string;
  bsDateAPIStr: string;
 
  transformDate(date, format) {
   return this.datePipe.transform(date, format);
 }
  constructor(private astroavailabilityService:AstroavailabilityService,
    private datePipe: DatePipe, private alertService: AlertService
    ) {
      this.maxDate = new Date();
    }
    ngOnInit(){
      this.bsValue = new Date();
      this.bsValueStr = this.transformDate(this.bsValue, 'M/d/y');
      this.bsDateAPIStr = this.transformDate(this.bsValue, 'y-M-d');
      this.getastroavailability(this.bsDateAPIStr);
      console.log( this.astroAvailabilityreport);
      
    }
    
    getastroavailability(date:string){
      this.loading = true;
     this.astroavailabilityService.getAstroAvailabilityReport(date).subscribe(      
           data => {
            this.loading = false;
            console.log(data);
             this.astroAvailabilityreport = data;
                         
           }, error => {
            
          this.loading = false;
          this.alertService.errorTimedOut('something went wrong!', 3000);
        }
         )
   }
   onChangeGetDetail(){
    
     this.bsDateAPIStr = this.transformDate(this.bsValue, 'y-M-d');
     this.getastroavailability(this.bsDateAPIStr);
   }
  
}
