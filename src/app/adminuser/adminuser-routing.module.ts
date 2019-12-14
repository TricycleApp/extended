import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminuserPage } from './adminuser.page';

const routes: Routes = [
  {
    path: '',
    component: AdminuserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminuserPageRoutingModule {}
