import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalificacionesComponent } from './calificaciones.component';
import { RegistroCalificacionComponent } from './registro-calificacion/registro-calificacion.component';
import { RegistroIndividualComponent } from './registro-individual/registro-individual.component';


const routes: Routes = [
    { path: '', component: CalificacionesComponent },
    { path: 'registro/:operacion', component: RegistroCalificacionComponent },
    { path: 'registro-individual', component: RegistroIndividualComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalificacionesRoutingModule { }
