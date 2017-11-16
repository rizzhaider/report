import { DummyService } from './../../../services/dummy.service';
import { ActivatedRoute, Params, Data, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-daywisereport',
  templateUrl: './daywisereport.component.html',
 
 
})
export class DaywisereportComponent implements OnInit, OnDestroy {
  monthlydata: {id: number, name: string, status: string};
  constructor(private dummyService:DummyService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
   
    this.route.data
    .subscribe(
      (data: Data) => {
        this.monthlydata = data['monthlydata'];
      }
    );
  }

  ngOnDestroy() {
    
  }

}
