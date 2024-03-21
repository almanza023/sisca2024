
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentModule } from 'src/app/shared/components/component.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CalificacionesComponent } from './calificaciones.component';
import { RegistroCalificacionComponent } from './registro-calificacion/registro-calificacion.component';
import { CalificacionesRoutingModule } from './calificaciones-routing.module';
import { RegistroIndividualComponent } from './registro-individual/registro-individual.component';





@NgModule({
  declarations: [
    CalificacionesComponent,
    RegistroCalificacionComponent,
    RegistroIndividualComponent,
  ],
  imports: [
    CommonModule,
    ComponentModule,
    ReactiveFormsModule,
    CalificacionesRoutingModule
  ]
})
export class CalificacionesModule { }
