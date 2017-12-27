import { AstroforcereportComponent } from './astroforcereport.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  {
    path: '',
    component: AstroforcereportComponent,
    data: {
      title: 'Astro Force Report'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AstroforcereportRoutingModule {}
