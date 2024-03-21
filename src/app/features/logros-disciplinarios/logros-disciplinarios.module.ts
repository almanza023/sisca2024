import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentModule } from 'src/app/shared/components/component.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LogrosDisciplinariosComponent } from './logros-disciplinarios.component';
import { RegistroLogroDisciplinarioComponent } from './registro-logro-disciplinario/registro-logro-disciplinario.component';
import { LogrosDisciplinariossRoutingModule } from './logros-disciplinarios-routing.module';





@NgModule({
  declarations: [
    LogrosDisciplinariosComponent,
    RegistroLogroDisciplinarioComponent,
  ],
  imports: [
    CommonModule,
    ComponentModule,
    ReactiveFormsModule,
    LogrosDisciplinariossRoutingModule
  ]
})
export class LogrosDisciplinariosModule { }
