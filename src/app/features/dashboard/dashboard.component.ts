import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription, finalize } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { EstadisticaService } from '../../core/services/estadistica.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

    items!: MenuItem[];
    contadores:any={};
    estadisticas:any=[];
    pdf:string="";
    rol:string="";
    puestoconfirmado:string="";
    usuario:string="";
    totalconfirmados:string="0";



    constructor(private estadisticaService: EstadisticaService,
         public layoutService: LayoutService,
         private router: Router) {

    }

    ngOnInit() {
        this.rol=localStorage.getItem('rol');

        this.puestoconfirmado=localStorage.getItem('puestoconfirma')
        this.usuario=localStorage.getItem('usuarioconfirma')
        this.getTotalConfirmadosUsuario();
        if(this.rol != '3'){
            this.obtenerContadores();
        }
    }

    obtenerContadores(){
        this.estadisticaService
            .getEstadisticas()
            .pipe(finalize(() => this.getEstadisticaLideres()))
            .subscribe(
                (response) => {
                    console.log(response.data);
                    this.contadores = response.data;
                },
                (error) => {

                }
            );
    }

    getEstadisticaLideres(){
        this.estadisticaService
            .getEstadisticaLideres()
            .subscribe(
                (response) => {
                    console.log(response.data);
                    this.estadisticas = response.data;
                },
                (error) => {
                    this.estadisticas=[];
                }
            );
    }

    getEstadisticaGeneral(){
        this.estadisticaService
            .getEstadisticaGeneral()
            .pipe(finalize(() => this.downloadFile(this.pdf, 'ReporteGeneral.pdf')))
            .subscribe(
                (response) => {
                    console.log(response.data);
                    this.pdf = response.pdf;
                },
                (error) => {
                    this.pdf="";
                }
            );
    }

    downloadFile(base64:any,fileName:any){
        if(base64!=""){
            const src = `data:application/pdf;base64,${base64}`;
            const link = document.createElement("a")
            link.href = src
            link.download = fileName
            link.click()
            link.remove()
        }
    }

    abrirPageConfirmacion(){
        this.router.navigate(['/votantes/confirmar']);
    }



    ngOnDestroy() {

    }

    getTotalConfirmadosUsuario(){
        this.estadisticaService
            .getTotalConfirmadosUsuario(this.usuario)
            .subscribe(
                (response) => {
                    console.log(response.data);
                    this.totalconfirmados = response.data;
                },
                (error) => {
                    this.totalconfirmados="0";
                }
            );
    }
}
