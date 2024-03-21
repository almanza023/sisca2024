import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentModule } from 'src/app/shared/components/component.module';


import { ReactiveFormsModule } from '@angular/forms';
import { DireccionGradosComponent } from './direccion-grados.component';
import { DireccionGradosRoutingModule } from './direccion-grados-routing.module';




@NgModule({
  declarations: [
    DireccionGradosComponent,
  ],
  imports: [
    CommonModule,
    ComponentModule,
    DireccionGradosRoutingModule,
    ReactiveFormsModule
  ]
})
export class DireccionGradosModule { }
