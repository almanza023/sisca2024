import { Component, SimpleChanges, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ReporteService } from '../../../core/services/reporte.service';
import { finalize } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectorSedeComponent } from 'src/app/shared/components/selector-sede/selector-sede.component';
import { SelectorGradosComponent } from 'src/app/shared/components/selector-grados/selector-grados.component';
import { SelectorAsignaturasComponent } from 'src/app/shared/components/selector-asignaturas/selector-asignaturas.component';
import { SelectorPeriodoComponent } from 'src/app/shared/components/selector-periodo/selector-periodo.component';


@Component({
  selector: 'app-reporte-general',
  templateUrl: './reporte-general.component.html',
  providers: [MessageService],
})
export class ReporteGeneralComponent {

    filtro:any={};
    data:any=[];
    pdf:string="";
    sublideres:any=[];
    nombreModulo:string;
    form: FormGroup;
    tiporeporte:any;
    ocultarPanelAisgPer:boolean=false;


    @ViewChild(SelectorSedeComponent) sedeComponent: SelectorSedeComponent;
    @ViewChild(SelectorGradosComponent) gradosComponent: SelectorGradosComponent;
    @ViewChild(SelectorAsignaturasComponent)  asignaturasComponent: SelectorAsignaturasComponent;
    @ViewChild(SelectorPeriodoComponent) periodoComponent: SelectorPeriodoComponent;

    constructor(
        private messageService: MessageService,
        private reporteService: ReporteService,
        private fb: FormBuilder

    ){}
    ngOnInit() {
        this.nombreModulo="Reportes General";

        this.form = this.fb.group({
            sede_id: ['', Validators.required],
            grado_id: ['', Validators.required],
            tipo_id: ['', Validators.required],
            asignatura_id: ['',],
            periodo_id: ['',],
        });
    }

    getValores(event, operacion) {
        switch (operacion) {
            case 'sede':
                if (event != null) {
                    this.form.get('sede_id').setValue(event.id);
                    //this.formEnviar.get('sede_id').setValue(event.id);
                    this.gradosComponent.getGradosBySede(event.id);
                }
                break;
            case 'grado':
                if (event != null) {
                    this.form.get('grado_id').setValue(event.id);
                    this.asignaturasComponent.getAsignaturasBySedeAndGrado(
                        this.form.get('sede_id').value,
                        event.id
                    );
                    //this.formEnviar.get('grado_id').setValue(event.id);

                }
                break;
            case 'asignatura':
                if (event != null) {
                    this.form.get('asignatura_id').setValue(event.id);
                    //this.formEnviar.get('asignatura_id').setValue(event.id);
                }
                break;
            case 'periodo':
                if (event != null) {
                    this.form.get('periodo_id').setValue(event.id);
                    //this.formEnviar.get('periodo_id').setValue(event.id);
                }
                break;
                case 'tipo':
                    this.tiporeporte=event.id;
                    this.form.get('tipo_id').setValue(event.id);

                    console.log(this.tiporeporte);
                    if(this.tiporeporte==1){
                        //Habilitar asignatura y periodo
                        this.ocultarPanelAisgPer=false;
                    }
                    if(this.tiporeporte==2 || this.tiporeporte==3){
                        //Habilitar asignatura y periodo
                        this.ocultarPanelAisgPer=true;

                    }

                    break;
        }
    }









    getDatMatriculas(filtro) {
        this.reporteService
            .reporteMatriculas(filtro)
            .pipe(finalize(() => this.downloadFile(this.pdf, 'ReporteMatriculas.pdf')))
            .subscribe(
                (response) => {
                    console.log(response.pdf);
                    this.pdf = response.pdf;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Reporte Generado Exitosamente',
                        detail: response.message,
                        life: 3000,
                    });
                },
                (error) => {
                    this.messageService.add({
                        severity: 'warn',
                        summary: 'Advertencia',
                        detail: error.error.message,
                        life: 3000,
                    });

                }
            );
    }

    getDatCalificaciones(filtro) {
        this.reporteService
            .reporteCalificaciones(filtro)
            .pipe(finalize(() => this.downloadFile(this.pdf, 'ReporteCalificaciones.pdf')))
            .subscribe(
                (response) => {
                    console.log(response.pdf);
                    this.pdf = response.pdf;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Reporte Generado Exitosamente',
                        detail: response.message,
                        life: 3000,
                    });
                },
                (error) => {
                    this.messageService.add({
                        severity: 'warn',
                        summary: 'Advertencia',
                        detail: error.error.message,
                        life: 3000,
                    });

                }
            );
    }

    getDatConsolidados(filtro) {
        this.reporteService
            .reporteConsolidadoPeriodo(filtro)
            .pipe(finalize(() => this.downloadFile(this.pdf, 'ReporteConsolidado.pdf')))
            .subscribe(
                (response) => {
                    console.log(response.pdf);
                    this.pdf = response.pdf;
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Reporte Generado Exitosamente',
                        detail: response.message,
                        life: 3000,
                    });
                },
                (error) => {
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

    onSubmit(){
        if(this.form.valid){
            if(this.tiporeporte==1){
                this.getDatMatriculas(this.form.value);
            }
            if(this.tiporeporte==2){
                this.getDatCalificaciones(this.form.value);
            }
            if(this.tiporeporte==3){
                this.getDatConsolidados(this.form.value);
            }
        }else{
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: "Debe seleccionar los campos obligatorios",
                life: 3000,
            });
        }
    }






}