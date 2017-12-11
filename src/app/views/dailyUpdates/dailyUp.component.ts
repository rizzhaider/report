import { DayWiseReport } from './../../shared/model/daywisereport.model';
import { UserDayWiseService } from './../../services/userdaywise.service';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
@Component({
  templateUrl: 'dailyUp.component.html'
})
export class DailyUpComponent implements OnInit  {
   loading : boolean = false;
   bsValue: Date;
   maxDate: Date;
  
   bsValueStr: string;
   bsDateAPIStr: string;
   DayWiseReport : DayWiseReport;
   transformDate(date, format) {
    return this.datePipe.transform(date, format);
  }
  constructor(private userDayWiseService: UserDayWiseService,
    private datePipe: DatePipe,
    ) {
      this.maxDate = new Date();
    }
    ngOnInit(){
      this.bsValue = new Date();
      this.bsValueStr = this.transformDate(this.bsValue, 'M/d/y');
      this.bsDateAPIStr = this.transformDate(this.bsValue, 'y-M-d');
      this.getDayWiseReport(this.bsDateAPIStr);
    }

   getDayWiseReport(date: string){
     this.loading = true;
    this.userDayWiseService.getDailyWiseDetail(date).subscribe(      
          data => {
            this.loading = false;
            this.DayWiseReport = data.astroUserActivityDTO;
                        
          }
        )
  }
  
  onChangeGetDetail(){
   
    this.bsDateAPIStr = this.transformDate(this.bsValue, 'y-M-d');
    this.getDayWiseReport(this.bsDateAPIStr);
  }
}
