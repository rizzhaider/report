import { AstroconsolidatedService } from './../../../services/astroconsolidated.service';
import { AlertService } from './../../../services/alert.service';
import { Astromonthreport } from './../../../shared/model/astro-month-report.model';

import { ActivatedRoute, Router, NavigationExtras, Params } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
 
  templateUrl: './astrowisereport.component.html',
 

})

export class AstrowisereportComponent implements OnInit, OnDestroy, NavigationExtras      {
   

  relativeTo?: ActivatedRoute | null
  queryParams?: Params | null
  fragment?: string
  preserveQueryParams?: boolean
 
  preserveFragment?: boolean
  skipLocationChange?: boolean
  replaceUrl?: boolean

  loading : boolean = false;
  public selectedYear:  any = null;
  public selectedMonth:any = null;
  public astromonthReports:Astromonthreport[] = [];
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
  bsValue: Date = new Date();
 
  private dumyyContent: {id: number, name:string}[] = [];
  
 
  constructor( private route: ActivatedRoute,
     private router: Router, private astroconsolidatedService :AstroconsolidatedService,
     private alertService: AlertService,) {
     
   }

  ngOnInit() {
  
   
    var currerntTime = new Date();
    var currentYear = currerntTime.getFullYear();
    var currentMonth = currerntTime.getMonth() + 1;
    this.selectedYear = currentYear;
    this.selectedMonth = currentMonth;
    console.log(this.selectedYear)
    this.getAstroconsolidatedList(this.selectedYear, this.selectedMonth);
   
  }
  
  ngOnDestroy() {}

  

  getAstroconsolidatedList(year:any, month:any){
    this.loading = true;
    this.astroconsolidatedService.getAstroConsolidatedReport(year, month, '').subscribe(      
            data => {
             this.loading = false;
             this.astromonthReports = data.loggingtrackmonthlist;
             console.log(this.astromonthReports)
            },error => {
              this.loading = false;
              this.alertService.errorTimedOut('something went wrong!', 3000);
            }
          )  
  }
  onYearChnage(onSelectYear:any){
  this.selectedYear = onSelectYear;
  this.getAstroconsolidatedList(this.selectedYear, this.selectedMonth);
  }
  onMonthChange(onSelectMonth:any){
    this.selectedMonth = onSelectMonth;
    this.getAstroconsolidatedList(this.selectedYear, this.selectedMonth);
  }
  onNavigate(monthReport:Astromonthreport){
    let navigationExtras: NavigationExtras = {
      queryParams: { year: this.selectedYear, month:this.selectedMonth },
      skipLocationChange: true,
      
    };
    this.router.navigate(['/consolidatedreport/astrowisereport', monthReport.astroid, this.selectedYear, this.selectedMonth ]);
  }

}
