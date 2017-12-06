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
 
  preserveFragment?: boolean
  skipLocationChange?: boolean
  replaceUrl?: boolean  
  monthlydata: {};
  public astromonthReports:Astromonthreport[] = [];
  constructor( private route: ActivatedRoute, private router: Router, private astroconsolidatedService :AstroconsolidatedService) {}
 
  ngOnInit() {
   
    const selectedYear = +this.route.snapshot.queryParams['year'];
    const selectedMonth = +this.route.snapshot.queryParams['month'];       
    const astroid = +this.route.snapshot.params['astroid'];
    
   
    //this.monthlydata = this.astroconsolidatedService.getAstroConsolidatedReport(this.selectedYear, this.selectedMonth, astroid);
    this.route.params.subscribe(
      (params: Params) => {
        this.getAstroconsolidatedList(selectedYear, selectedMonth, astroid);
      }

    );
    
    console.log(astroid);
    console.log(selectedYear);
    console.log(selectedMonth);
   
   
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
    this.router.navigate([ '/astroconsolidatedreport',monthReport.astroid, monthReport.astroid],  navigationExtras  );
  }
}
