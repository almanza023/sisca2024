import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { matriculasComponent } from './matriculas.component';
import { RegistroMatriculaComponent } from './registro-matriculas/registro-matricula.component';


const routes: Routes = [
    { path: '', component: matriculasComponent },
    { path: 'registro/:id', component: RegistroMatriculaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatriculasRoutingModule { }
