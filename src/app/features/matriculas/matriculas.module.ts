import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentModule } from 'src/app/shared/components/component.module';
import { ReactiveFormsModule } from '@angular/forms';
import { matriculasComponent } from './matriculas.component';
import { RegistroMatriculaComponent } from './registro-matriculas/registro-matricula.component';
import { MatriculasRoutingModule } from './matriculas-routing.module';


@NgModule({
  declarations: [
    matriculasComponent,
    RegistroMatriculaComponent,
  ],
  imports: [
    CommonModule,
    ComponentModule,
    ReactiveFormsModule,
    MatriculasRoutingModule
  ]
})
export class MatriculaModule { }
