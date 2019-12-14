import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminprodPage } from './adminprod.page';

const routes: Routes = [
  {
    path: '',
    component: AdminprodPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminprodPageRoutingModule {}
