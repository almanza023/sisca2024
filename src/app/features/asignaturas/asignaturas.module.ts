import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentModule } from 'src/app/shared/components/component.module';
import { AsignaturasComponent } from './asignaturas.component';
import { AsignaturasRoutingModule } from './asignaturas-routing.module';



@NgModule({
  declarations: [
    AsignaturasComponent,
  ],
  imports: [
    CommonModule,
    ComponentModule,
    AsignaturasRoutingModule
  ]
})
export class AsignaturasModule { }
