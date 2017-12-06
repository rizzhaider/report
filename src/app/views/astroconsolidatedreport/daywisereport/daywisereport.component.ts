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
   
   dayWiseData: { name: string, status: string}[];
  constructor(private route: ActivatedRoute, private router: Router, private astroconsolidatedService: AstroconsolidatedService) { }

  ngOnInit() {
    const astroid = +this.route.snapshot.params['astroid'];
      const selectedDate = this.route.snapshot.queryParams['date'];
 
    
    this.route.params.subscribe(
      (params: Params) => {
        this.getAstroReportDay(astroid, selectedDate);
      }

    );
    console.log(astroid);
    console.log(selectedDate);
  }

  ngOnDestroy() {
    
  }
  getAstroReportDay(astroId:number, sessionDate:string){
    this.astroconsolidatedService.getAstroReportDay(astroId, sessionDate).subscribe(      
            data => {
              console.log(data);
            //  this.astromonthReports = data.loggingtrackmonthlist;
            //  console.log(this.astromonthReports)
            }
          )
  }

}
