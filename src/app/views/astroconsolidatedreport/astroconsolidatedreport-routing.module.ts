import { DaywisereportComponent } from './daywisereport/daywisereport.component';

import { MonthlydayreportComponent } from './monthlydayreport/monthlydayreport.component';
import { AstroconsolidatedreportComponent } from './astroconsolidatedreport.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, NavigationExtras  } from '@angular/router';




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
        path: ':astroid',
        
        data: {
          title: 'Astro Monthly Report',
         
          
        },
        children: [
          {
            path: '',
            component: MonthlydayreportComponent,
            data: {
              title: '',
             
            }
            
          },
          {
            path: ':astroid',
            component: DaywisereportComponent,
            data: {
              title: 'Astro Day Wise Report'
            }
          }
        ]
      }
    ]


  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  
})
export class AstroconsolidatedreportRoutingModule { 



}
