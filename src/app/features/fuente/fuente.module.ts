import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentModule } from 'src/app/shared/components/component.module';
import { FuentesComponent } from './fuente.component';
import { FuenteRoutingModule } from './fuente-routing.module';

@NgModule({
  declarations: [
    FuentesComponent,
  ],
  imports: [
    CommonModule,
    ComponentModule,
    FuenteRoutingModule
  ]
})
export class FuenteModule { }
