import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AperturaPeriodoComponent } from './apertura-periodo.component';


const routes: Routes = [{ path: '', component: AperturaPeriodoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AperturaPeriodoRoutingModule { }
