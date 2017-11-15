import { DummyService } from './../../../services/dummy.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-monthlydayreport',
  templateUrl: './monthlydayreport.component.html',
 
 
})
export class MonthlydayreportComponent implements OnInit, OnDestroy {
      monthlydayreport:{id:number, name:string, status: string} ;
      paramsSubscription:Subscription;
  constructor(private dummyService:DummyService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    this.monthlydayreport =this.dummyService.getServer(id)  
    console.log('Init')
   this.route.params.subscribe(
      (params: Params) => {
        this.monthlydayreport = this.dummyService.getServer(+params['id']);
       
      }
    );
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

}
