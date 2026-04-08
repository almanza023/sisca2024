import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { RegistroObservacionesComponent } from './registro-observaciones/registro-observaciones.component';
import { ObservacionesComponent } from './observaciones.component';


const routes: Routes = [
    { path: '', component: ObservacionesComponent },
    { path: 'registro/:operacion', component: RegistroObservacionesComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ObservacionesRoutingModule { }
