import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuentesComponent } from './fuente.component';


const routes: Routes = [{ path: '', component: FuentesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuenteRoutingModule { }
