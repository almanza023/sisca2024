
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentModule } from 'src/app/shared/components/component.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NivelacionesComponent } from './nivelaciones.component';
import { RegistroNivelacionComponent } from './registro-nivelacion/registro-nivelacion.component';
import { NivelacionesRoutingModule } from './nivelaciones-routing.module';


@NgModule({
  declarations: [
    NivelacionesComponent,
    RegistroNivelacionComponent,
  ],
  imports: [
    CommonModule,
    ComponentModule,
    ReactiveFormsModule,
    NivelacionesRoutingModule
  ]
})
export class NivelacionesModule { }
