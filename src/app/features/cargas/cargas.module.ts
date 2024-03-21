import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentModule } from 'src/app/shared/components/component.module';
import { CargasComponent } from './cargas.component';
import { CargasRoutingModule } from './cargas-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistroCargaComponent } from './registro-carga/registro-carga.component';





@NgModule({
  declarations: [
    CargasComponent,
    RegistroCargaComponent,
  ],
  imports: [
    CommonModule,
    ComponentModule,
    ReactiveFormsModule,
    CargasRoutingModule
  ]
})
export class CargasModule { }
