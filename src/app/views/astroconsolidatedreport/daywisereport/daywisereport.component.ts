import { DatePipe } from '@angular/common';
import { Session } from './../../../shared/model/timeList.model';
import { AstroconsolidatedService } from './../../../services/astroconsolidated.service';
import { DummyService } from './../../../services/dummy.service';
import { ActivatedRoute, Params, Data, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-daywisereport',
  templateUrl: './daywisereport.component.html',
 
})
export class DaywisereportComponent implements OnInit, OnDestroy {
  loading:boolean = false;
  public timeLists: Session[] = [];
  sessionDate: string;
  selectedYear:number;
  selectedMonth:number;
  maxDate: Date;
  minDate:Date;
  bsValue:Date;
  astroid:number;
  bsValueStr: string;
  bsDateAPIStr: string;
  transformDate(date, format) {
    return this.datePipe.transform(date, format);
  }
  constructor(private route: ActivatedRoute, private router: Router, private astroconsolidatedService: AstroconsolidatedService, 
    private datePipe: DatePipe) {
      this.maxDate = new Date();    
     }

  ngOnInit() {
    this.selectedYear = +this.route.snapshot.params['selectedYear'];
    this.selectedMonth = +this.route.snapshot.params['selectedMonth'];
    this.astroid = +this.route.snapshot.params['astroid'];
    this.sessionDate = this.route.snapshot.params['sessiondate'];
    console.log('sesssion Date' + '' + this.sessionDate);
    this.bsValue = new Date(this.sessionDate);
    this.bsValueStr = this.transformDate(this.bsValue, 'M/d/y');
    // this.bsDateAPIStr = this.transformDate(this.bsValue, 'y-M-d');
    this.sessionDate = this.transformDate(this.bsValue, 'y-M-d');
    this.getAstroReportDay(this.astroid, this.sessionDate);
    this.route.params.subscribe(
      (params: Params) => {
        const atsroid = params['astroid'];       
        const sessionDate = params['sessiondate'];        
        this.getAstroReportDay(atsroid, sessionDate);
      }

    );
    console.log(this.astroid);
    console.log(this.sessionDate);
    console.log(this.selectedMonth)
  }

  ngOnDestroy() {
    
  }
  getAstroReportDay(astroId:number, sessionDate:string){
    this.loading = true;
    this.astroconsolidatedService.getAstroReportDay(astroId, sessionDate).subscribe(      
            data => {
              this.loading = false;
              this.timeLists = data.timelist;
              
             console.log(this.timeLists);
          //   this.astromonthReports = data.loggingtrackmonthlist;
           //  console.log(this.astromonthReports)
            }
          )
  }
  onChangeGetDetail(){
    
     this.sessionDate = this.transformDate(this.bsValue, 'y-M-d');
    
     this.getAstroReportDay(this.astroid, this.sessionDate);
     this.router.navigate(['/astroconsolidatedreport',this.astroid, this.selectedYear, this.selectedMonth, this.astroid, this.sessionDate], {relativeTo: this.route});
   }
  
}
