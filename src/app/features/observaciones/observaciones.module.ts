
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentModule } from 'src/app/shared/components/component.module';
import { ReactiveFormsModule } from '@angular/forms';


import { ObservacionesComponent } from './observaciones.component';
import { ObservacionesRoutingModule } from './observaciones-routing.module';
import { RegistroObservacionesComponent } from './registro-observaciones/registro-observaciones.component';





@NgModule({
  declarations: [
    ObservacionesComponent,
    RegistroObservacionesComponent,
  ],
  imports: [
    CommonModule,
    ComponentModule,
    ReactiveFormsModule,
    ObservacionesRoutingModule
  ]
})
export class ObservacionesModule { }
