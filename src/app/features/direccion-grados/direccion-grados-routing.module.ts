import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DireccionGradosComponent } from './direccion-grados.component';


const routes: Routes = [{ path: '', component: DireccionGradosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DireccionGradosRoutingModule { }
