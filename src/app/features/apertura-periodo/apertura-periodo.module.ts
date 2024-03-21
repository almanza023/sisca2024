import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentModule } from 'src/app/shared/components/component.module';


import { ReactiveFormsModule } from '@angular/forms';
import { AperturaPeriodoComponent } from './apertura-periodo.component';
import { AperturaPeriodoRoutingModule } from './apertura-periodo-routing.module';





@NgModule({
  declarations: [
    AperturaPeriodoComponent,
  ],
  imports: [
    CommonModule,
    ComponentModule,
    AperturaPeriodoRoutingModule,
    ReactiveFormsModule
  ]
})
export class AperturaPeriodoModule { }
