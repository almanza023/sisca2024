
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentModule } from 'src/app/shared/components/component.module';
import { ReactiveFormsModule } from '@angular/forms';

import { LogrosObservacionComponent } from './logros-observacion.component';
import { RegistroLogroObservacionComponent } from './registro-logro-observacion/registro-logro-observacion.component';
import { LogrosObservacionRoutingModule } from './logros-observacion-routing.module';





@NgModule({
  declarations: [
    LogrosObservacionComponent,
    RegistroLogroObservacionComponent,
  ],
  imports: [
    CommonModule,
    ComponentModule,
    ReactiveFormsModule,
    LogrosObservacionRoutingModule
  ]
})
export class LogrosObservacionModule { }
