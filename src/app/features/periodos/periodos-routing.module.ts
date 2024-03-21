import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeriodosComponent } from './periodos.component';

const routes: Routes = [{ path: '', component: PeriodosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeriodosRoutingModule { }
