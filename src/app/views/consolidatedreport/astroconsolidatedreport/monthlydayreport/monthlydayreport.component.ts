import { AstroconsolidatedService } from './../../../../services/astroconsolidated.service';
import { AlertService } from './../../../../services/alert.service';
import { Astromonthreport } from './../../../../shared/model/astro-month-report.model';


import { ActivatedRoute, Params,  Router, NavigationExtras } from '@angular/router';
import { Component, OnInit, OnDestroy, Input, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-monthlydayreport',
  templateUrl: './monthlydayreport.component.html',

 
})
export class MonthlydayreportComponent implements OnInit, OnDestroy, OnChanges {
 
  loading:boolean = false;
  public astroid:number;
  public astroName:string;
  selectedYear:number = null;
  selectedMonth:number = null;
  preserveFragment?: boolean
  skipLocationChange?: boolean
  replaceUrl?: boolean  
  monthlydata: {};
  years = Array(100).fill(0, 0, 100).map((x, i) => i + 2000);
  months = [
    {name: "January", value: 1 },
    {name: "February", value: 2 },
    {name: "March", value: 3 },
    {name: "April", value: 4 },
    {name: "May", value: 5 },
    {name: "June", value: 6 },
    {name: "July", value: 7 },
    {name: "August", value: 8 },
    {name: "September", value: 9 },
    {name: "October", value: 10 },
    {name: "November", value: 11 },
    {name: "December", value: 12 },
  ]
  public astromonthReports:Astromonthreport[] = [];
  constructor( private route: ActivatedRoute, private router: Router, private astroconsolidatedService :AstroconsolidatedService,
                 private alertService:AlertService) {}
 
  ngOnInit() {
   
         
    this.astroid = +this.route.snapshot.params['astroid'];
    this.selectedYear = +this.route.snapshot.params['selectedYear'];
    this.selectedMonth = +this.route.snapshot.params['selectedMonth'];  
    
   
    
    this.route.params.subscribe(
      (params: Params) => {
        const astroid = params['astroid'];
        const selectedYear = params['selectedYear'];
        const selectedMonth = params['selectedMonth'];  
        console.log('selectedMonth Date ' + '' + selectedMonth);
        this.getAstroconsolidatedList(selectedYear, selectedMonth, astroid);
      }

    );
    
    console.log(this.astroid);
    console.log(this.selectedYear);
    console.log(this.selectedMonth);
   
   
  }
  ngOnChanges(){

  }

  ngOnDestroy() {
    
  }
  getAstroconsolidatedList(year:any, month:any, atroId:any){
    this.loading = true;
    this.astroconsolidatedService.getAstroConsolidatedReport(year, month, atroId).subscribe(      
            data => {
              this.loading = false;
             this.astromonthReports = data.loggingtrackmonthlist;
             this.astromonthReports.forEach(astroName => {
               this.astroName = astroName.astro_name;
             })
             console.log(this.astromonthReports)
            }, error => {
              
            this.loading = false;
            this.alertService.errorTimedOut('something went wrong!', 3000);
          }
          )
  }


  onYearChnage(){    
    this.getAstroconsolidatedList(this.selectedYear, this.selectedMonth, this.astroid);
    this.router.navigate(['/consolidatedreport/astrowisereport',this.astroid, this.selectedYear, this.selectedMonth], {relativeTo: this.route});
    }
    onMonthChange(){     
      this.getAstroconsolidatedList(this.selectedYear, this.selectedMonth, this.astroid);
      this.router.navigate(['/consolidatedreport/astrowisereport',this.astroid, this.selectedYear, this.selectedMonth], {relativeTo: this.route});
    }

  onNavigate(monthReport:Astromonthreport){
    
    let navigationExtras: NavigationExtras = {
      queryParams: { date:monthReport.logging_date},
      skipLocationChange: true,
     
    };
    this.router.navigate([ '/consolidatedreport/astrowisereport',monthReport.astroid, this.selectedYear, this.selectedMonth, monthReport.astroid, monthReport.logging_date]  );
  }
}
