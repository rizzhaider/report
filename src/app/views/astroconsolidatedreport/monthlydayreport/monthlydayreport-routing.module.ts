import { MonthlydayreportComponent } from './monthlydayreport.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: MonthlydayreportComponent,
    data: {
      title: 'Monthly Consolidated Report'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonthlydayreportRoutingModule {}
