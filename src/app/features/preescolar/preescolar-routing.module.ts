import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroIndividualComponent } from './registro-individual/registro-individual.component';
import { PreescolarComponent } from './preescolar.component';


const routes: Routes = [
    { path: '', component: PreescolarComponent },
    { path: 'registro', component: RegistroIndividualComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreescolarRoutingModule { }
