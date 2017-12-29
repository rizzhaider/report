import { AlertService } from './../../../services/alert.service';
import { AstroconsolidatedService } from './../../../services/astroconsolidated.service';
import { Astrodaywisereport } from './../../../shared/model/astrodaywisereport.model';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Params,  Router, NavigationExtras } from '@angular/router';
import { Component, OnInit, OnDestroy, Input, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-daywisereport',
  templateUrl: './daywisereport.component.html',
})
export class DaywisereportComponent implements OnInit {
 
  loading:boolean = false;
  bsValue: Date;
  maxDate: Date; 
  bsValueStr: string;
  bsDateAPIStr: string;
  astrodaywisereportLists:Astrodaywisereport[] = [];

  transformDate(date, format) {
    return this.datePipe.transform(date, format);
  }
  constructor( private route: ActivatedRoute, private router: Router,
               private datePipe: DatePipe, private astroconsolidatedService:AstroconsolidatedService,
                private alertService:AlertService) {
                this.maxDate = new Date();
  }
 
  ngOnInit() {
   
 
    this.bsValue = new Date();
    this.bsValue.setDate(this.bsValue.getDate() - 2);
    this.bsValueStr = this.transformDate(this.bsValue, 'd/M/y');
    this.bsDateAPIStr = this.transformDate(this.bsValue, 'y-M-d');
    this.getAstrodaywiseList(this.bsDateAPIStr);
  }
   getAstrodaywiseList(date:string){   
     this.loading = true;
      this.astroconsolidatedService.getAstrodayWiseReport(date).subscribe(
         data => {
           this.loading = false;
           this.astrodaywisereportLists = data.loggingtrackmonthlist;
           console.log(this.astrodaywisereportLists);
        },
        error => {
            this.loading = false;
            this.alertService.errorTimedOut('something went wrong!', 3000);
        }
      )
   }

   onChangeGetDetail(){  
    this.bsValueStr = this.transformDate(this.bsValue, 'd/M/y');  
     this.bsDateAPIStr = this.transformDate(this.bsValue, 'y-M-d');   
     this.getAstrodaywiseList(this.bsDateAPIStr);
   }
  
}
