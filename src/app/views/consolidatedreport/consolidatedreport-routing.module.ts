import { DaywisereportComponent } from './daywisereport/daywisereport.component';
import { DaywisesessionreportComponent } from './astroconsolidatedreport/daywisesessionreport/daywisesessionreport.component';
import { AstrowisereportComponent } from './astroconsolidatedreport/astrowisereport.component';

import { MonthlydayreportComponent } from './astroconsolidatedreport/monthlydayreport/monthlydayreport.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, NavigationExtras  } from '@angular/router';
const routes: Routes = [
    {
      path: '',
      data: {
        title: ''
      },
      children: [
        {
            path: 'astrowisereport',
            data: {
              title: 'Astro Wise Report'
            },
            children: [
              {
                path: '',
                component: AstrowisereportComponent,
                data: {
                  title: ''
                }
              },
              {
                path: ':astroid/:selectedYear/:selectedMonth',
                
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
                    path: ':astroid/:sessiondate',
                    component: DaywisesessionreportComponent,
                    data: {
                      title: 'Astro Session Wise Report'
                    }
                  }
                ]
              }
            ]
          },
          {
            path: 'daywisereport',
            component: DaywisereportComponent,
            data: {
              title: 'Astro Day Wise Report'
            }
          },



        
       
      ]
    }
  ];









// const routes: Routes = [
//   {
//     path: '',
//     data: {
//       title: 'Astro Consolidated Report'
//     },
//     children: [
//       {
//         path: '',
//         component: AstroconsolidatedreportComponent,
//         data: {
//           title: ''
//         }
//       },
//       {
//         path: ':astroid/:selectedYear/:selectedMonth',
        
//         data: {
//           title: 'Astro Monthly Report',
         
          
//         },
//         children: [
//           {
//             path: '',
//             component: MonthlydayreportComponent,
//             data: {
//               title: '',
             
//             }
            
//           },
//           {
//             path: ':astroid/:sessiondate',
//             component: DaywisereportComponent,
//             data: {
//               title: 'Astro Day Wise Report'
//             }
//           }
//         ]
//       }
//     ]


//   }


// ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  
})
export class ConsolidatedreportRoutingModule { 



}
