import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription, finalize } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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

    // Reloj e IP
    horaActual: string = '';
    fechaActual: string = '';
    diaSemana: string = '';
    ipInfo: any = null;
    private clockInterval: any;


    constructor(private estadisticaService: EstadisticaService,
         public layoutService: LayoutService,
         private router: Router,
         private http: HttpClient) {

    }

    ngOnInit() {
        this.rol=localStorage.getItem('rol');
        this.id=localStorage.getItem('docente_id');
        this.obtenerContadores();
        this.obtenerContadoresDocente(this.id);
        this.getMatriculasGrado();
        this.getMatriculaSede();
        this.iniciarReloj();
        this.obtenerInfoIP();
    }

    iniciarReloj() {
        const DIAS = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
        const MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
        const actualizar = () => {
            const ahora = new Date();
            this.diaSemana  = DIAS[ahora.getDay()];
            this.fechaActual = `${this.diaSemana}, ${ahora.getDate()} de ${MESES[ahora.getMonth()]} de ${ahora.getFullYear()}`;
            const hh = String(ahora.getHours()).padStart(2, '0');
            const mm = String(ahora.getMinutes()).padStart(2, '0');
            const ss = String(ahora.getSeconds()).padStart(2, '0');
            this.horaActual = `${hh}:${mm}:${ss}`;
        };
        actualizar();
        this.clockInterval = setInterval(actualizar, 1000);
    }

    obtenerInfoIP() {
        this.http.get('https://ipinfo.io/json').subscribe({
            next: (data: any) => { this.ipInfo = data?.ip ? data : null; },
            error: ()         => { this.ipInfo = null; }
        });
    }

    obtenerContadores(){
        this.estadisticaService
        .getContadores()
        .subscribe(
            (response) => {
                //console.log(response.data);
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
                //console.log(response.data);
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
                //console.log(response.data);
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
        if (this.clockInterval) { clearInterval(this.clockInterval); }
    }

    getMatriculasGrado(){
        this.estadisticaService
            .getMatriculaGrados()
            .subscribe(
                (response) => {
                    //console.log(response.data);
                    this.matriculasGrado = response.data;
                },
                (error) => {
                    this.matriculasGrado=[];
                }
            );
    }
}
