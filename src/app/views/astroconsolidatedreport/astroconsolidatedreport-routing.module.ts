import { DaywisereportComponent } from './daywisereport/daywisereport.component';

import { MonthlydayreportComponent } from './monthlydayreport/monthlydayreport.component';
import { AstroconsolidatedreportComponent } from './astroconsolidatedreport.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Astro Consolidated Report'
    },
    children: [
      {
        path: '', 
        component: AstroconsolidatedreportComponent, 
        data: {
          title: ''
        }
      },
      {
        path: '',        
        data: {
          title: 'Astro Monthly Report',
        },
        children:[
          
        {          
          path: ':id', component: MonthlydayreportComponent,
          data: {
            title: ''
            
          },
        },
        {
          path: ':id/:sessionId', component: DaywisereportComponent,
          data: {
            title: 'Astro DayWise Report'
          }
        }
        ]
      },
      


    ],
   
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AstroconsolidatedreportRoutingModule { }
