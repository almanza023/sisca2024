import { TipoAsignaturasComponent } from './tipo-asignaturas.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentModule } from 'src/app/shared/components/component.module';
import { TipoAsignaturaRoutingModule } from './tipo-asignaturas-routing.module';


@NgModule({
  declarations: [
    TipoAsignaturasComponent,
  ],
  imports: [
    CommonModule,
    ComponentModule,
    TipoAsignaturaRoutingModule
  ]
})
export class TipoAsignaturaModule { }
