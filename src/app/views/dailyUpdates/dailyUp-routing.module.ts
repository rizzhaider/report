import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DailyUpComponent } from './dailyUp.component';

const routes: Routes = [
  {
    path: '',
    component: DailyUpComponent,
    data: {
      title: 'Daily Updates'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DailyUpRoutingModule {}
