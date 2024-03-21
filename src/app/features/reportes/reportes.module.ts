import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { ComponentModule } from '../../shared/components/component.module';
import { ReportesRoutingModule } from './reportes-routing.module';
import { ReporteVotantesComponent } from './reporte-votantes/reporte-votantes.component';

@NgModule({
    imports: [
        CommonModule,
        ComponentModule,
        ReportesRoutingModule
    ],
    declarations: [
    ReporteVotantesComponent
  ]
})
export class ReportesModule { }
