import { DummyService } from './../../../services/dummy.service';

import { ActivatedRoute, Params, Data, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-monthlydayreport',
  templateUrl: './monthlydayreport.component.html',
 
 
})
export class MonthlydayreportComponent implements OnInit, OnDestroy {
  
  monthlydata: { name: string, status: string}[] = [];
  constructor(private dummyService:DummyService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    this.monthlydata = this.dummyService.getServerList(id);
    this.route.params.subscribe(
      (params: Params) => {
       this.monthlydata = this.dummyService.getServerList(+params['id']);
      }

    );
    console.log('hii' + this.monthlydata)
  }
 

  ngOnDestroy() {
    
  }
  
}
