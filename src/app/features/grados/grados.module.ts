import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentModule } from 'src/app/shared/components/component.module';
import { GradosComponent } from './grados.component';
import { GradosRoutingModule } from './grados-routing.module';




@NgModule({
  declarations: [
    GradosComponent
  ],
  imports: [
    CommonModule,
    ComponentModule,
    GradosRoutingModule
  ]
})
export class GradosModule { }
