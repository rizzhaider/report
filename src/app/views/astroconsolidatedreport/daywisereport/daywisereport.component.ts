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
  constructor(private dummyService:DummyService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    const sessionId = +this.route.snapshot.params['sessionId'];
   // console.log("day:" + id);
    this.dayWiseData =   this.dummyService.getServerTeamList(id, sessionId);
    this.route.params.subscribe(
      (params: Params) => {
       this.dayWiseData = this.dummyService.getServerTeamList(+params['id'], +params['sessionId']);
      }

    );
    console.log("day:  DayWise FootBall Data" + " " + this.dayWiseData);
  }

  ngOnDestroy() {
    
  }


}
