import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TipoAsignaturasComponent } from './tipo-asignaturas.component';

const routes: Routes = [{ path: '', component: TipoAsignaturasComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoAsignaturaRoutingModule { }
