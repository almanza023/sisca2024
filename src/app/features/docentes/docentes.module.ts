import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentModule } from 'src/app/shared/components/component.module';

import { DocentesRoutingModule } from './docentes-routing.module';
import { DocentesComponent } from './docentes.component';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    DocentesComponent,
  ],
  imports: [
    CommonModule,
    ComponentModule,
    DocentesRoutingModule,
    ReactiveFormsModule
  ]
})
export class DocentesModule { }
