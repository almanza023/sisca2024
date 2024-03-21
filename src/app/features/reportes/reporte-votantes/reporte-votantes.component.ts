import { Component, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ReporteService } from '../../../core/services/reporte.service';
import { pdfDefaultOptions } from 'ngx-extended-pdf-viewer';
import { finalize } from 'rxjs';
import { PersonasService } from 'src/app/core/services/personas.service';

@Component({
  selector: 'app-reporte-votantes',
  templateUrl: './reporte-votantes.component.html',
  providers: [MessageService],
})
export class ReporteVotantesComponent {

    filtro:any={};
    data:any=[];
    loading1:boolean=false;
    loading2:boolean=false;
    loading3:boolean=false;

    loadingCodigo1:boolean=false;
    loadingCodigo2:boolean=false;
    loadingCodigo3:boolean=false;



    loadingTicket1:boolean=false;
    loadingTicket2:boolean=false;
    loadingTicket3:boolean=false;


    pdf:string="";
    sublideres:any=[];
    constructor(
        private messageService: MessageService,
        private reporteService: ReporteService,
        private personaService: PersonasService,
        private cdr: ChangeDetectorRef

    ){}
    ngOnInit() {

    }

    ngOnChanges(changes: SimpleChanges): void {
        //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
        //Add '${implements OnChanges}' to the class.
    }

    getLider(event){
        this.filtro.lider=event.id;
    }

    getSubLider(event){
        this.filtro.sublider=event.id;
    }

    soloLider(){
        this.sublideres=[];
        if(this.filtro.lider==undefined || this.filtro.lider==""){
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe Seleccionar un Líder',
                life: 3000,
            });
            return;
        }
        this.loading1=true;
        setTimeout(() => {
            this.getDataAll("Reporte Lider_"+this.filtro.lider);
        }, 2000);
    }

    consultar(){
        this.sublideres=[];
        if(this.filtro.lider==undefined || this.filtro.lider==""){
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe Seleccionar un Líder',
                life: 3000,
            });
            return;
        }
        if(this.filtro.sublider==undefined || this.filtro.sublider==""){
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe Seleccionar un sublíder',
                life: 3000,
            });
            return;
        }

        this.loading3=true;
        setTimeout(() => {
            this.getDataAll("Reporte Sublider");
        }, 2000);


    }

    sublideresTodos(){
        this.sublideres=[];
        if(this.filtro.lider==undefined || this.filtro.lider==""){
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe Seleccionar un Líder',
                life: 3000,
            });
            return;
        }
        this.personaService.getSublider(this.filtro.lider).subscribe(response => {
            this.sublideres=response.data;
            } ,error => {
              console.log( error.error)
            });

        setTimeout(() => {
            if(this.sublideres.length>0){
                this.loading2=true;
                this.sublideres.forEach(element => {
                    this.filtro.lider=element.lider_id;
                    this.filtro.sublider=element.id;
                    let nombre=element.nombrecompleto;
                    this.getDataAll(nombre);
                    setTimeout(() => { }, 500);
                });
            }else{
                this.loading3=false;
                this.messageService.add({
                    severity: 'warn',
                    summary: 'Advertencia',
                    detail: 'No existen sublíderes',
                    life: 3000,
                });
                return;
            }
        }, 3000);


    }

    getDataAll(nombre:string) {
        this.reporteService
            .postVotante(this.filtro)
            .pipe(finalize(() => this.downloadFile(this.pdf, nombre+'.pdf')))
            .subscribe(
                (response) => {
                    console.log(response.pdf);
                    this.pdf = response.pdf;
                    this.loading1=false;
                    this.loading2=false;
                    this.loading3=false;

                    this.messageService.add({
                        severity: 'success',
                        summary: 'Reporte Generado Exitosamente',
                        detail: response.message,
                        life: 3000,
                    });
                },
                (error) => {
                    this.loading1=false;
                    this.loading2=false;
                    this.loading3=false;
                    this.messageService.add({
                        severity: 'warn',
                        summary: 'Advertencia',
                        detail: error.error.message,
                        life: 3000,
                    });

                }
            );
    }

    getDataAllCodigo(nombre:string) {
        this.reporteService
            .postVotanteCodigo(this.filtro)
            .pipe(finalize(() => this.downloadFile(this.pdf, nombre+'.pdf')))
            .subscribe(
                (response) => {
                    console.log(response.pdf);
                    this.pdf = response.pdf;
                    this.loadingCodigo1=false;
                    this.loadingCodigo2=false;
                    this.loadingCodigo3=false;

                    this.messageService.add({
                        severity: 'success',
                        summary: 'Reporte Generado Exitosamente',
                        detail: response.message,
                        life: 3000,
                    });
                },
                (error) => {
                    this.loadingCodigo1=false;
                    this.loadingCodigo2=false;
                    this.loadingCodigo3=false;

                    this.messageService.add({
                        severity: 'warn',
                        summary: 'Advertencia',
                        detail: error.error.message,
                        life: 3000,
                    });

                }
            );
    }

    getDataAllTicket(nombre:string) {
        this.reporteService
            .postVotanteTicket(this.filtro)
            .pipe(finalize(() => this.downloadFile(this.pdf, nombre+'.pdf')))
            .subscribe(
                (response) => {
                    console.log(response.pdf);
                    this.pdf = response.pdf;
                    this.loadingTicket1=false;
                    this.loadingTicket2=false;
                    this.loadingTicket3=false;

                    this.messageService.add({
                        severity: 'success',
                        summary: 'Reporte Ticket Generado Exitosamente',
                        detail: response.message,
                        life: 3000,
                    });
                },
                (error) => {
                    this.loadingTicket1=false;
                    this.loadingTicket2=false;
                    this.loadingTicket3=false;
                    this.messageService.add({
                        severity: 'warn',
                        summary: 'Advertencia',
                        detail: error.error.message,
                        life: 3000,
                    });

                }
            );
    }

    downloadFile(base64:any,fileName:any){
        if(base64!==undefined){
            const src = `data:application/pdf;base64,${base64}`;
            const link = document.createElement("a")
            link.href = src
            link.download = fileName
            link.click()
            link.remove()
        }else{
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: "Error al Generar PDF",
                life: 3000,
            });
        }
    }

    puestosVotacion() {
        this.reporteService
            .postPuestos(this.filtro)
            .pipe(finalize(() => this.downloadFile(this.pdf, 'Estadisticas_Puestos_Votacion.pdf')))
            .subscribe(
                (response) => {
                    console.log(response.pdf);
                    this.pdf = response.pdf;
                    this.loading1=false;
                    this.loading2=false;
                    this.loading3=false;

                    this.messageService.add({
                        severity: 'success',
                        summary: 'Reporte Generado Exitosamente',
                        detail: response.message,
                        life: 3000,
                    });
                },
                (error) => {
                    this.loading1=false;
                    this.loading2=false;
                    this.loading3=false;
                    this.messageService.add({
                        severity: 'warn',
                        summary: 'Advertencia',
                        detail: error.error.message,
                        life: 3000,
                    });

                }
            );
    }

    mesasVotacion() {
        this.reporteService
            .postMesas(this.filtro)
            .pipe(finalize(() => this.downloadFile(this.pdf, 'Estadisticas_Mesas_Votacion.pdf')))
            .subscribe(
                (response) => {
                    console.log(response.pdf);
                    this.pdf = response.pdf;
                    this.loading1=false;
                    this.loading2=false;
                    this.loading3=false;

                    this.messageService.add({
                        severity: 'success',
                        summary: 'Reporte Generado Exitosamente',
                        detail: response.message,
                        life: 3000,
                    });
                },
                (error) => {
                    this.loading1=false;
                    this.loading2=false;
                    this.loading3=false;
                    this.messageService.add({
                        severity: 'warn',
                        summary: 'Advertencia',
                        detail: error.error.message,
                        life: 3000,
                    });

                }
            );
    }

    soloLiderCodigo(){
        this.sublideres=[];
        if(this.filtro.lider==undefined || this.filtro.lider==""){
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe Seleccionar un Líder',
                life: 3000,
            });
            return;
        }
        this.loadingCodigo1=true;
        setTimeout(() => {
            this.getDataAllCodigo("Reporte Lider_Codigo_"+this.filtro.lider);
        }, 2000);
    }

    consultarCodigo(){
        this.sublideres=[];
        if(this.filtro.lider==undefined || this.filtro.lider==""){
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe Seleccionar un Líder',
                life: 3000,
            });
            return;
        }
        if(this.filtro.sublider==undefined || this.filtro.sublider==""){
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe Seleccionar un sublíder',
                life: 3000,
            });
            return;
        }

        this.loadingCodigo3=true;
        setTimeout(() => {
            this.getDataAllCodigo("Reporte Sublider");
        }, 2000);


    }

    sublideresTodosCodigo(){
        this.sublideres=[];
        if(this.filtro.lider==undefined || this.filtro.lider==""){
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe Seleccionar un Líder',
                life: 3000,
            });
            return;
        }
        this.personaService.getSublider(this.filtro.lider).subscribe(response => {
            this.sublideres=response.data;
            } ,error => {
              console.log( error.error)
            });

        setTimeout(() => {
            if(this.sublideres.length>0){
                this.loadingCodigo2=true;
                this.sublideres.forEach(element => {
                    this.filtro.lider=element.lider_id;
                    this.filtro.sublider=element.id;
                    let nombre=element.nombrecompleto+"_Codigo";
                    this.getDataAllCodigo(nombre);
                    setTimeout(() => { }, 500);
                });
            }else{
                this.loading3=false;
                this.messageService.add({
                    severity: 'warn',
                    summary: 'Advertencia',
                    detail: 'No existen sublíderes',
                    life: 3000,
                });
                return;
            }
        }, 3000);


    }

    soloLiderTicket(){
        this.sublideres=[];
        if(this.filtro.lider==undefined || this.filtro.lider==""){
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe Seleccionar un Líder',
                life: 3000,
            });
            return;
        }
        this.loadingTicket1=true;
        setTimeout(() => {
            this.getDataAllTicket("Reporte Lider_Ticket_"+this.filtro.lider);
        }, 2000);
    }

    consultarTicket(){
        this.sublideres=[];
        if(this.filtro.lider==undefined || this.filtro.lider==""){
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe Seleccionar un Líder',
                life: 3000,
            });
            return;
        }
        if(this.filtro.sublider==undefined || this.filtro.sublider==""){
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe Seleccionar un sublíder',
                life: 3000,
            });
            return;
        }

        this.loadingTicket3=true;
        setTimeout(() => {
            this.getDataAllTicket("Reporte Sublider_TiCket");
        }, 2000);


    }

    sublideresTodosTicket(){
        this.sublideres=[];
        if(this.filtro.lider==undefined || this.filtro.lider==""){
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe Seleccionar un Líder',
                life: 3000,
            });
            return;
        }
        this.personaService.getSublider(this.filtro.lider).subscribe(response => {
            this.sublideres=response.data;
            } ,error => {
              console.log( error.error)
            });

        setTimeout(() => {
            if(this.sublideres.length>0){
                this.loadingTicket2=true;
                this.sublideres.forEach(element => {
                    this.filtro.lider=element.lider_id;
                    this.filtro.sublider=element.id;
                    let nombre=element.nombrecompleto+"_Ticket";
                    this.getDataAllTicket(nombre);
                    setTimeout(() => { }, 500);
                });
            }else{
                this.loadingTicket2=false;
                this.messageService.add({
                    severity: 'warn',
                    summary: 'Advertencia',
                    detail: 'No existen sublíderes',
                    life: 3000,
                });
                return;
            }
        }, 3000);


    }




}
