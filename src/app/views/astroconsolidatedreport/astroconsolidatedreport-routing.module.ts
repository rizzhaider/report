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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AstroconsolidatedreportRoutingModule {}
