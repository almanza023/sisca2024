import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CargasComponent } from './cargas.component';
import { RegistroCargaComponent } from './registro-carga/registro-carga.component';


const routes: Routes = [
    { path: '', component: CargasComponent },
    { path: 'registro', component: RegistroCargaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CargasRoutingModule { }
