import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentModule } from '../../shared/components/component.module';
import { ReportesRoutingModule } from './reportes-routing.module';
import { ReporteGeneralComponent } from './reporte-general/reporte-general.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ReporteboletinperiodoComponent } from './reporteboletinperiodo/reporteboletinperiodo.component';

@NgModule({
    imports: [
        CommonModule,
        ComponentModule,
        ReactiveFormsModule,
        ReportesRoutingModule
    ],
    declarations: [
    ReporteGeneralComponent,
    ReporteboletinperiodoComponent
  ]
})
export class ReportesModule { }
