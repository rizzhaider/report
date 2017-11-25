import { AstroavailabilityreportComponent } from './astroavailabilityreport.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  {
    path: '',
    component: AstroavailabilityreportComponent,
    data: {
      title: 'Astro Availability Report'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AstroavailabilityreportRoutingModule {}
