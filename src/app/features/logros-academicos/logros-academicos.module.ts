import { LogrosAcademicosRoutingModule } from './logros-academicos-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentModule } from 'src/app/shared/components/component.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LogrosAcademicosComponent } from './logros-academicos.component';
import { RegistroLogroAcademicoComponent } from './registro-logro-academico/registro-logro-academico.component';





@NgModule({
  declarations: [
    LogrosAcademicosComponent,
    RegistroLogroAcademicoComponent,
  ],
  imports: [
    CommonModule,
    ComponentModule,
    ReactiveFormsModule,
    LogrosAcademicosRoutingModule
  ]
})
export class LogrosAcademicosModule { }
