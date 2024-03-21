import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogrosDisciplinariosComponent } from './logros-disciplinarios.component';
import { RegistroLogroDisciplinarioComponent } from './registro-logro-disciplinario/registro-logro-disciplinario.component';


const routes: Routes = [
    { path: '', component: LogrosDisciplinariosComponent },
    { path: 'registro', component: RegistroLogroDisciplinarioComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogrosDisciplinariossRoutingModule { }
