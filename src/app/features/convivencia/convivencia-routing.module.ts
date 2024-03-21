import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroIndividualComponent } from './registro-individual/registro-individual.component';
import { ConvivenciaComponent } from './convivencia.component';
import { RegistroConvivenciaComponent } from './registro-convivencia/registro-convivencia.component';


const routes: Routes = [
    { path: '', component: ConvivenciaComponent },
    { path: 'registro/:operacion', component: RegistroConvivenciaComponent },
    { path: 'registro-individual', component: RegistroIndividualComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConvivenciaRoutingModule { }
