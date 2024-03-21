
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentModule } from 'src/app/shared/components/component.module';
import { PeriodosComponent } from './periodos.component';
import { PeriodosRoutingModule } from './periodos-routing.module';


@NgModule({
  declarations: [
    PeriodosComponent,
  ],
  imports: [
    CommonModule,
    ComponentModule,
    PeriodosRoutingModule
  ]
})
export class PeriodosModule { }
