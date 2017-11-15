import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PackagesComponent } from './packages.component';

const routes: Routes = [
  {
    path: '',
    component: PackagesComponent,
    data: {
      title: 'Package'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PackagesRoutingModule {}
