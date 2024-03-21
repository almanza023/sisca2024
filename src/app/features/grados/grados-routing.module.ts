import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GradosComponent } from './grados.component';


const routes: Routes = [{ path: '', component: GradosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GradosRoutingModule { }
