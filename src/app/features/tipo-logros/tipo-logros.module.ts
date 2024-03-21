import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentModule } from 'src/app/shared/components/component.module';
import { TipoLogrosComponent } from './tipo-logros.component';
import { TipoLogrosRoutingModule } from './tipo-logros-routing.module';



@NgModule({
  declarations: [
    TipoLogrosComponent,
  ],
  imports: [
    CommonModule,
    ComponentModule,
    TipoLogrosRoutingModule
  ]
})
export class TipoLogrosModule { }
