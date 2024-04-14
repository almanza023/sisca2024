
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentModule } from 'src/app/shared/components/component.module';
import { ReactiveFormsModule } from '@angular/forms';

import { RegistroIndividualComponent } from './registro-individual/registro-individual.component';
import { PreescolarComponent } from './preescolar.component';
import { PreescolarRoutingModule } from './preescolar-routing.module';





@NgModule({
  declarations: [
    PreescolarComponent,
    RegistroIndividualComponent,
  ],
  imports: [
    CommonModule,
    ComponentModule,
    ReactiveFormsModule,
    PreescolarRoutingModule
  ]
})
export class PreescolarModule { }
