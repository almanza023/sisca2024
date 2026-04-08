import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogrosObservacionComponent } from './logros-observacion.component';
import { RegistroLogroObservacionComponent } from './registro-logro-observacion/registro-logro-observacion.component';


const routes: Routes = [
    { path: '', component: LogrosObservacionComponent },
    { path: 'registro', component: RegistroLogroObservacionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogrosObservacionRoutingModule { }
