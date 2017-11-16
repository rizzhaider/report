import { DummyService } from './../../services/dummy.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
 
  templateUrl: './astroconsolidatedreport.component.html',
 

})
export class AstroconsolidatedreportComponent implements OnInit, OnDestroy  {
  private dumyyContent: {id: number, name: string, status: string}[] = [];
  
 
  constructor(private dummyService: DummyService, private route: ActivatedRoute, private router: Router) {
    
   }

  ngOnInit() {

    this.dumyyContent = this.dummyService.getServers();
    console.log(this.dumyyContent)
    
  }
  
  ngOnDestroy() {}

 


}
