import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogrosPreescolarComponent } from './logros-preescolar.component';
import { RegistroLogroPreescolarComponent } from './registro-logro-preescolar/registro-logro-preescolar.component';


const routes: Routes = [
    { path: '', component: LogrosPreescolarComponent },
    { path: 'registro', component: RegistroLogroPreescolarComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogrosPreescolarRoutingModule { }
