import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogrosAcademicosComponent } from './logros-academicos.component';
import { RegistroLogroAcademicoComponent } from './registro-logro-academico/registro-logro-academico.component';


const routes: Routes = [
    { path: '', component: LogrosAcademicosComponent },
    { path: 'registro', component: RegistroLogroAcademicoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogrosAcademicosRoutingModule { }
