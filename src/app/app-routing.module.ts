import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './shared/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { AuthGuard } from './core/guards/auth.guard';
import { VerPowerbiComponent } from './shared/components/ver-powerbi/ver-powerbi.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [

                    { path: 'dashboard', loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
                      canActivate: [AuthGuard] },
                    { path: 'grados', loadChildren: () => import('./features/grados/grados.module').then(m => m.GradosModule),
                      canActivate: [AuthGuard] },
                      { path: 'docentes', loadChildren: () => import('./features/docentes/docentes.module').then(m => m.DocentesModule),
                      canActivate: [AuthGuard] },
                      { path: 'asignaturas', loadChildren: () => import('./features/asignaturas/asignaturas.module').then(m => m.AsignaturasModule),
                      canActivate: [AuthGuard] },
                      { path: 'sedes', loadChildren: () => import('./features/sedes/sedes.module').then(m => m.SedesModule),
                      canActivate: [AuthGuard] },
                      { path: 'tipoasignaturas', loadChildren: () => import('./features/tipo-asignaturas/tipo-asignaturas.module').then(m => m.TipoAsignaturaModule),
                      canActivate: [AuthGuard] },
                      { path: 'periodos', loadChildren: () => import('./features/periodos/periodos.module').then(m => m.PeriodosModule),
                      canActivate: [AuthGuard] },
                      { path: 'tipologros', loadChildren: () => import('./features/tipo-logros/tipo-logros.module').then(m => m.TipoLogrosModule),
                      canActivate: [AuthGuard] },
                      { path: 'usuarios', loadChildren: () => import('./features/usuarios/usuarios.module').then(m => m.UsuariosModule),
                      canActivate: [AuthGuard] },
                      { path: 'cargas', loadChildren: () => import('./features/cargas/cargas.module').then(m => m.CargasModule),
                      canActivate: [AuthGuard] },
                      { path: 'matriculas', loadChildren: () => import('./features/matriculas/matriculas.module').then(m => m.MatriculaModule),
                      canActivate: [AuthGuard] },
                      { path: 'logros-academicos', loadChildren: () => import('./features/logros-academicos/logros-academicos.module').then(m => m.LogrosAcademicosModule),
                      canActivate: [AuthGuard] },
                      { path: 'valoraciones', loadChildren: () => import('./features/logros-preescolar/logros-preescolar.module').then(m => m.LogrosPreescolarModule),
                      canActivate: [AuthGuard] },
                      { path: 'preescolar', loadChildren: () => import('./features/preescolar/preescolar.module').then(m => m.PreescolarModule),
                      canActivate: [AuthGuard] },
                      { path: 'calificaciones', loadChildren: () => import('./features/calificaciones/calificaciones.module').then(m => m.CalificacionesModule),
                      canActivate: [AuthGuard] },
                      { path: 'direccion-grados', loadChildren: () => import('./features/direccion-grados/direccion-grados.module').then(m => m.DireccionGradosModule),
                      canActivate: [AuthGuard] },
                      { path: 'apertura-periodos', loadChildren: () => import('./features/apertura-periodo/apertura-periodo.module').then(m => m.AperturaPeriodoModule),
                      canActivate: [AuthGuard] },
                      { path: 'logros-disciplinarios', loadChildren: () => import('./features/logros-disciplinarios/logros-disciplinarios.module').then(m => m.LogrosDisciplinariosModule),
                      canActivate: [AuthGuard] },
                      { path: 'convivencia', loadChildren: () => import('./features/convivencia/convivencia.module').then(m => m.ConvivenciaModule),
                      canActivate: [AuthGuard] },
                      { path: 'reportes', loadChildren: () => import('./features/reportes/reportes.module').then(m => m.ReportesModule),
                      canActivate: [AuthGuard] },
                      { path: 'cambiar-clave', loadChildren: () => import('./features/cambiar-clave/cambiar-clave.module').then(m => m.CambiarClaveModule),
                      canActivate: [AuthGuard] },

                ]
            },
            { path: 'auth', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: 'reporte', component: VerPowerbiComponent },

            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
