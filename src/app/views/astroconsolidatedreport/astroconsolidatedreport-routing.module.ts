import { MonthlydayreportComponent } from './monthlydayreport/monthlydayreport.component';
import { AstroconsolidatedreportComponent } from './astroconsolidatedreport.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AstroconsolidatedreportComponent, 
      
    data: {
      title: 'Astro Consolidated Report'
    }
  },

  {path : 'astroconsolidatedreport/:id', component: AstroconsolidatedreportComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AstroconsolidatedreportRoutingModule {}
