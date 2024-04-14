import { ReporteGeneralComponent } from './reporte-general/reporte-general.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReporteboletinperiodoComponent } from './reporteboletinperiodo/reporteboletinperiodo.component';


@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ReporteGeneralComponent },
        { path: 'boletin-periodo', component: ReporteboletinperiodoComponent },
    ])],
    exports: [RouterModule]
})
export class ReportesRoutingModule { }
