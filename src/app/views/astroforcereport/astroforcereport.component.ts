import { Astroforcereport } from './../../shared/model/astroforce-logout.model';
import { AstroforcelogoutService } from './../../services/astroforcelogout.service';
import { AlertService } from './../../services/alert.service';


import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
@Component({
  templateUrl: 'astroforcereport.component.html'
})
export class AstroforcereportComponent implements OnInit {
  public astroforcelogoutReportLists:Astroforcereport[] = [];
  loading : boolean = false;;
  bsValueStart: Date;
  maxDateStart: Date; 
  bsValueStrStart: string;
  bsDateAPIStrStart: string;

  minDateEnd:Date;
  bsValueEnd: Date;
  maxDateEnd: Date; 
  bsValueStrEnd: string;
  bsDateAPIStrEnd: string;
 
  transformDate(date, format) {
   return this.datePipe.transform(date, format);
 }
  constructor(private astroforcelogoutService:AstroforcelogoutService,
    private datePipe: DatePipe, private alertService: AlertService
    ) {
      this.maxDateStart = new Date();
      this.maxDateEnd = new Date();
    }
    ngOnInit(){
      this.bsValueStart = new Date();
      this.bsValueStrStart = this.transformDate(this.bsValueStart, 'd/M/y');
      this.bsDateAPIStrStart = this.transformDate(this.bsValueStart, 'y-M-d');
      
      this.bsValueEnd = new Date();
      this.bsValueStrEnd = this.transformDate(this.bsValueEnd, 'd/M/y');
      this.bsDateAPIStrEnd = this.transformDate(this.bsValueEnd, 'y-M-d');
      
      this.getAstroforcelogoutList(this.bsDateAPIStrStart, this.bsDateAPIStrEnd);
      
     
      
    }
    
    getAstroforcelogoutList(startDate:string, endDate:string){
      this.loading = true;
     this.astroforcelogoutService.getAstroConsolidatedReport(startDate, endDate).subscribe(      
           data => {
            this.loading = false;
            console.log(data);
             this.astroforcelogoutReportLists = data.astroForceLogout;
                         
           }, error => {
            
          this.loading = false;
          this.alertService.errorTimedOut('something went wrong!', 3000);
        }
         )
   }
   onChangeStartdate(){
    this.bsValueStrStart = this.transformDate(this.bsValueStart, 'd/M/y');
     this.bsDateAPIStrStart = this.transformDate(this.bsValueStart, 'y-M-d');
     this.minDateEnd = this.bsValueStart;
     this.getAstroforcelogoutList(this.bsDateAPIStrStart, this.bsDateAPIStrEnd);
   }
   onChangeEnddate(){
    this.bsValueStrEnd = this.transformDate(this.bsValueEnd, 'd/M/y');
     this.bsDateAPIStrEnd = this.transformDate(this.bsValueEnd, 'y-M-d');
     this.getAstroforcelogoutList(this.bsDateAPIStrStart, this.bsDateAPIStrEnd);
   }
  
}
