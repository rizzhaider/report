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
   
  public timeLists: Session[] = [];
 
  constructor(private route: ActivatedRoute, private router: Router, private astroconsolidatedService: AstroconsolidatedService) { }

  ngOnInit() {
    const astroid:number = +this.route.snapshot.params['astroid'];
    const sessiondate = this.route.snapshot.params['sessiondate']; 
    
    this.route.params.subscribe(
      (params: Params) => {
        this.getAstroReportDay(astroid, sessiondate);
      }

    );
    console.log(astroid);
    console.log(sessiondate);
  }

  ngOnDestroy() {
    
  }
  getAstroReportDay(astroId:number, sessionDate:string){
    this.astroconsolidatedService.getAstroReportDay(astroId, sessionDate).subscribe(      
            data => {
              this.timeLists = data.timelist;
              
             console.log(this.timeLists);
          //   this.astromonthReports = data.loggingtrackmonthlist;
           //  console.log(this.astromonthReports)
            }
          )
  }

}
