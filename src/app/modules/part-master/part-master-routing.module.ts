import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartMasterComponent } from './part-master.component';

const routes: Routes = [
  {
    path: '',
    component: PartMasterComponent,
    data: { title: 'HPMS' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartMasterRoutingModule { }
