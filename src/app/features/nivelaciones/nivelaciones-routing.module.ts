import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroNivelacionComponent } from './registro-nivelacion/registro-nivelacion.component';
import { NivelacionesComponent } from './nivelaciones.component';


const routes: Routes = [
    { path: '', component: NivelacionesComponent },
    { path: 'registro/:operacion', component: RegistroNivelacionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NivelacionesRoutingModule { }
