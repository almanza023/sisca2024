import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TipoLogrosComponent } from './tipo-logros.component';

const routes: Routes = [{ path: '', component: TipoLogrosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoLogrosRoutingModule { }
