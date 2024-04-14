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
    id:string="";
    rol:string="";
    puestoconfirmado:string="";
    usuario:string="";
    totalconfirmados:string="0";
    matriculasGrado:any=[];
    matriculasSede:any=[];
    contadoresDocentes:any={};


    constructor(private estadisticaService: EstadisticaService,
         public layoutService: LayoutService,
         private router: Router) {

    }

    ngOnInit() {
        this.rol=localStorage.getItem('rol');
        this.id=localStorage.getItem('docente_id');
        this.obtenerContadores();
        this.obtenerContadoresDocente(this.id);
        this.getMatriculasGrado();
        this.getMatriculaSede();


    }

    obtenerContadores(){
        this.estadisticaService
        .getContadores()
        .subscribe(
            (response) => {
                console.log(response.data);
                this.contadores = response.data;
            },
            (error) => {
                this.contadores={};
            }
        );
    }

    obtenerContadoresDocente(id:any){
        this.estadisticaService
        .getContadoresDocente(id)
        .subscribe(
            (response) => {
                console.log(response.data);
                this.contadoresDocentes = response.data;
            },
            (error) => {
                this.contadoresDocentes={};
            }
        );
    }

    getMatriculaSede(){
        this.estadisticaService
        .getMatriculasSede()
        .subscribe(
            (response) => {
                console.log(response.data);
                this.matriculasSede = response.data;
            },
            (error) => {
                this.matriculasSede=[];
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

    getMatriculasGrado(){
        this.estadisticaService
            .getMatriculaGrados()
            .subscribe(
                (response) => {
                    console.log(response.data);
                    this.matriculasGrado = response.data;
                },
                (error) => {
                    this.matriculasGrado=[];
                }
            );
    }
}
