import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentModule } from 'src/app/shared/components/component.module';
import { SedesComponent } from './sedes.component';
import { SedesRoutingModule } from './sedes-routing.module';



@NgModule({
  declarations: [
    SedesComponent,
  ],
  imports: [
    CommonModule,
    ComponentModule,
    SedesRoutingModule
  ]
})
export class SedesModule { }
