import { ConvivenciaRoutingModule } from './convivencia-routing.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentModule } from 'src/app/shared/components/component.module';
import { ReactiveFormsModule } from '@angular/forms';

import { RegistroIndividualComponent } from './registro-individual/registro-individual.component';
import { ConvivenciaComponent } from './convivencia.component';
import { RegistroConvivenciaComponent } from './registro-convivencia/registro-convivencia.component';





@NgModule({
  declarations: [
    ConvivenciaComponent,
    RegistroConvivenciaComponent,
    RegistroIndividualComponent,
  ],
  imports: [
    CommonModule,
    ComponentModule,
    ReactiveFormsModule,
    ConvivenciaRoutingModule
  ]
})
export class ConvivenciaModule { }
