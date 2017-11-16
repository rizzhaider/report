
import { MonthlydayreportComponent } from './monthlydayreport/monthlydayreport.component';
import { AstroconsolidatedreportComponent } from './astroconsolidatedreport.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', 
     
    children: [
      {path: '' , component: AstroconsolidatedreportComponent , data: {
      title: ''
    }},
     { path: ':id', component: MonthlydayreportComponent, 
     data: {
      title: 'Astro Monthly Report'
    }
    }
    
    ],
    data: {
      title: 'Astro Consolidated Report'
    }
  },

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AstroconsolidatedreportRoutingModule {}
