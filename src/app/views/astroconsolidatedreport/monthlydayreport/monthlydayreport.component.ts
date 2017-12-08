import { AstroconsolidatedService } from './../../../services/astroconsolidated.service';
import { Astromonthreport } from './../../../shared/model/astro-month-report.model';


import { ActivatedRoute, Params,  Router, NavigationExtras } from '@angular/router';
import { Component, OnInit, OnDestroy, Input, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-monthlydayreport',
  templateUrl: './monthlydayreport.component.html',
  
 
})
export class MonthlydayreportComponent implements OnInit, OnDestroy, OnChanges {

  relativeTo?: ActivatedRoute | null
  queryParams?: Params | null
  fragment?: string
  preserveQueryParams?: boolean
  selectedYear:number;
  selectedMonth:number;
  preserveFragment?: boolean
  skipLocationChange?: boolean
  replaceUrl?: boolean  
  monthlydata: {};
  public astromonthReports:Astromonthreport[] = [];
  constructor( private route: ActivatedRoute, private router: Router, private astroconsolidatedService :AstroconsolidatedService) {}
 
  ngOnInit() {
   
         
    const astroid = +this.route.snapshot.params['astroid'];
    this.selectedYear = +this.route.snapshot.params['selectedYear'];
    this.selectedMonth = +this.route.snapshot.params['selectedMonth'];  
    
   
    //this.monthlydata = this.astroconsolidatedService.getAstroConsolidatedReport(this.selectedYear, this.selectedMonth, astroid);
    this.route.params.subscribe(
      (params: Params) => {
        this.getAstroconsolidatedList(this.selectedYear, this.selectedMonth, astroid);
      }

    );
    
    console.log(astroid);
    console.log(this.selectedYear);
    console.log(this.selectedMonth);
   
   
  }
  ngOnChanges(){

  }

  ngOnDestroy() {
    
  }
  getAstroconsolidatedList(year:any, month:any, atroId:any){
    this.astroconsolidatedService.getAstroConsolidatedReport(year, month, atroId).subscribe(      
            data => {
             this.astromonthReports = data.loggingtrackmonthlist;
             console.log(this.astromonthReports)
            }
          )
  }
  onNavigate(monthReport:Astromonthreport){
    
    let navigationExtras: NavigationExtras = {
      queryParams: { date:monthReport.logging_date},
      skipLocationChange: true,
     
    };
    this.router.navigate([ '/astroconsolidatedreport',monthReport.astroid, this.selectedYear, this.selectedMonth, monthReport.astroid, monthReport.logging_date]  );
  }
}
