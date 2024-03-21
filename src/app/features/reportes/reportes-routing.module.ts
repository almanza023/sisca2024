import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReporteVotantesComponent } from './reporte-votantes/reporte-votantes.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'votantes', component: ReporteVotantesComponent },
    ])],
    exports: [RouterModule]
})
export class ReportesRoutingModule { }
