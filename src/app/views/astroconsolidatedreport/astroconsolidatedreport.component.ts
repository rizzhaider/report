import { Astromonthreport } from './../../shared/model/astro-month-report.model';
import { AstroconsolidatedService } from './../../services/astroconsolidated.service';
import { DummyService } from './../../services/dummy.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
 
  templateUrl: './astroconsolidatedreport.component.html',
 

})
export class AstroconsolidatedreportComponent implements OnInit, OnDestroy  {

  public selectedYear:any = null;
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
  
 
  constructor(private dummyService: DummyService, private route: ActivatedRoute,
     private router: Router, private astroconsolidatedService :AstroconsolidatedService) {
    
   }

  ngOnInit() {
  
    this.dumyyContent = this.dummyService.getServers();    
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
    this.astroconsolidatedService.getAstroConsolidatedReport(year, month).subscribe(      
            data => {
             this.astromonthReports = data.loggingtrackmonthlist;
             console.log(this.astromonthReports)
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

}
