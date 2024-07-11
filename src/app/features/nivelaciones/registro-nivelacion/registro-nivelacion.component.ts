import { Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { finalize } from 'rxjs';
import { CalificacionService } from 'src/app/core/services/calificacion.service';
import { LogrosAcademicosService } from 'src/app/core/services/logros-academicos.service';
import { ReporteService } from 'src/app/core/services/reporte.service';

import { SelectorAsignaturasComponent } from 'src/app/shared/components/selector-asignaturas/selector-asignaturas.component';
import { SelectorGradosComponent } from 'src/app/shared/components/selector-grados/selector-grados.component';
import { SelectorPeriodoComponent } from 'src/app/shared/components/selector-periodo/selector-periodo.component';
import { SelectorSedeComponent } from 'src/app/shared/components/selector-sede/selector-sede.component';

@Component({
    selector: 'app-registro-nivelacion',
    templateUrl: './registro-nivelacion.component.html',
    providers: [MessageService],
})
export class RegistroNivelacionComponent {

    operacion:any;
    clienteDialog: boolean = false;
    deleteProductDialog: boolean = false;
    deleteProductsDialog: boolean = false;

    data: any[] = [];
    calificacion: any = {};
    notasEst: any = [];

    selectedProducts: any[] = [];
    submitted: boolean = false;
    cols: any[] = [];
    statuses: any[] = [];
    seleccionado: any = {};
    item: any = {};
    rowsPerPageOptions = [5, 10, 20];
    form: FormGroup;
    formEnviar: FormGroup;
    iid: any = '';
    confirmacionModal: boolean = false;
    sede: any;
    periodo: any;

    nombreModulo: string = 'Nivelaciones de Semestre por Grado';
    @ViewChild(SelectorSedeComponent) sedeComponent: SelectorSedeComponent;
    @ViewChild(SelectorGradosComponent)
    gradosComponent: SelectorGradosComponent;
    @ViewChild(SelectorAsignaturasComponent)
    asignaturasComponent: SelectorAsignaturasComponent;
    @ViewChild(SelectorPeriodoComponent)
    periodoComponent: SelectorPeriodoComponent;
    modalLogros:boolean=false;
    dataLogros:any=[];
    listadoLogros:any=[];
    posicion:any;
    logroCognitivo:any;
    tipologro:any;
    modalDetalle:boolean=false;
    dataNotas:any=[];
    matriculas:any=[];
    calificacionesPeriodo:any=[];
    mostrarLoading:boolean=false;
    pdf:string;

    constructor(
        private calificacionService: CalificacionService,
        private logroService: LogrosAcademicosService,
        private reporteService: ReporteService,
        private messageService: MessageService,
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        //this.getDataAll();

        this.route.paramMap.subscribe(params => {
            this.operacion = params.get('operacion');

            if(this.operacion=="editar"){
                this.nombreModulo="Actualización de Notas"
            }
            //console.log(this.operacion);

        });

        this.cols = [
            { field: 'id', header: 'Código' },
            { field: 'descripcion', header: 'Descripción' },
            { field: 'estado', header: 'Estado' },
        ];

        this.statuses = [];
        this.form = this.fb.group({
            sede_id: ['', Validators.required],
            grado_id: ['', Validators.required],
            asignatura_id: ['29', Validators.required],
            periodo_id: ['', Validators.required],
        });

        this.formEnviar = this.fb.group({
            sede_id: ['', Validators.required],
            grado_id: ['', Validators.required],
            periodo_id: ['', Validators.required],
            asignatura_id: ['29', Validators.required],
            notas: this.fb.array([], Validators.required),
            logro_cog: ['', Validators.required],
            logro_afe: this.fb.array([], Validators.required),
        });
    }

    get notas(): FormArray {
        return this.formEnviar.get('notas') as FormArray;
    }


    get logro_afe(): FormArray {
        return this.formEnviar.get('logro_afe') as FormArray;
    }

    getValores(event, operacion) {
        switch (operacion) {
            case 'sede':
                if (event != null) {
                    this.form.get('sede_id').setValue(event.id);
                    this.formEnviar.get('sede_id').setValue(event.id);
                    this.gradosComponent.getGradosBySede(event.id);
                    this.sede = event.id;
                }
                break;
            case 'grado':
                if (event != null) {
                    this.form.get('grado_id').setValue(event.id);
                    this.formEnviar.get('grado_id').setValue(event.id);
                    this.asignaturasComponent.getAsignaturasBySedeAndGrado(
                        this.sede,
                        event.id
                    );
                }
                break;
            case 'asignatura':
                if (event != null) {
                    this.form.get('asignatura_id').setValue(event.id);
                    this.formEnviar.get('asignatura_id').setValue(event.id);
                }
                break;
            case 'periodo':
                if (event != null) {
                    this.form.get('periodo_id').setValue(event.id);
                    this.formEnviar.get('periodo_id').setValue(event.id);
                    this.periodo=event.id;
                }
                break;
        }
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }
    openModalLogros(index:any, tipo:any) {
        if(tipo==1){
            this.posicion=index;
            this.tipologro=tipo;
            this.dataLogros = this.listadoLogros.filter(objeto => objeto.tipo_logro_id == 3);
        }else{
            this.tipologro=tipo;
            this.dataLogros = this.listadoLogros.filter(objeto => objeto.tipo_logro_id == 2);
        }
        this.modalLogros = true;
    }

    bloqueoCliente(item: any) {
        this.deleteProductDialog = true;
        this.calificacion = { ...item };
        this.calificacion.cambio_estado = true;
    }



    getEstudiantes(item: any) {
        this.data=[];
        this.calificacionService
            .getMatriculasBySedeAndGrado(item)
            .pipe(finalize(() => this.cargarInputs()))
            .subscribe(
                (response) => {
                    //console.log(response.data);
                    this.data = response.data;
                    if(response.code==300){
                        this.messageService.add({
                            severity: 'warn',
                            summary: 'Advertencia',
                            detail: response.message,
                            life: 3500,
                        });
                    }
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

    getCalificaciones(item: any) {
        this.data=[];
        this.calificacionService
            .getCalificacionesPeriodo(item)
            .pipe(finalize(() => this.cargarInputs()))
            .subscribe(
                (response) => {
                    //console.log(response.data);
                    this.data = response.data;
                    if(response.code==300){
                        this.messageService.add({
                            severity: 'warn',
                            summary: 'Advertencia',
                            detail: response.message,
                            life: 3500,
                        });
                    }
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

    getLogros(item:any) {
        this.logroService
            .getFiltros(item)
            .subscribe(
                (response) => {
                    //console.log(response.data);
                    this.listadoLogros = response.data;
                },
                (error) => {
                    this.messageService.add({
                        severity: 'warn',
                        summary: 'Advertencia',
                        detail: error.error.message,
                        life: 3000,
                    });
                    this.listadoLogros=[];
                }
            );
    }

    clearControls() {
        const arrayLength = this.notas.length;
        for (let i = arrayLength - 1; i >= 0; i--) {
          this.notas.removeAt(i);
          this.logro_afe.removeAt(i);
        }
      }

    cargarInputs() {
        if (this.data.length > 0) {
            if(this.notas.length==0){
                for (let index = 0; index < this.data.length; index++) {
                    if(this.operacion=='guardar'){
                        this.notas.push(
                            this.fb.control('', [
                                Validators.required,
                                Validators.min(1),
                                Validators.max(5),
                            ])
                        );
                        this.logro_afe.push(
                            this.fb.control('', [
                                Validators.required
                            ])
                        );
                    }else{
                        this.notas.push(
                            this.fb.control(this.data[index].nota, [
                                Validators.required,
                                Validators.min(1),
                                Validators.max(5),
                            ])
                        );
                        this.logro_afe.push(
                            this.fb.control(this.data[index].logro_afectivo, [
                                Validators.required
                            ])
                        );
                    }
                }
                if(this.operacion=='editar'){
                    this.formEnviar.get('logro_cog').setValue(this.data[0].logro_cognitivo)
                }
            }
            //console.log(this.form.value);

        }
    }



    cargarMatriculas(){
        this.matriculas=[];
        if(this.operacion=='guardar'){
            for (let index = 0; index < this.data.length; index++) {
                this.matriculas.push(this.data[index].id);
                }
        }else{
            for (let index = 0; index < this.data.length; index++) {
                this.matriculas.push(this.data[index].matricula_id);
                }
        }
    }
    crear(item: any) {
        this.calificacionService
            .postData(item)
            .pipe(finalize(() => this.reinicarFormulario()))
            .subscribe(
                (response) => {
                    this.modalDetalle=true;
                    this.dataNotas=response.data;
                    //console.log('detalles'+response.data);
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Exitoso',
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

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    onSubmit() {
        if (this.form.valid) {
                this.data=[];
                this.clearControls();
                this.logroCognitivo='';
                this.formEnviar.reset();
                let filtro = this.form.value;
                this.getLogros(filtro);
                if(this.operacion=='guardar'){
                    this.getEstudiantes(filtro);
                }else{
                    this.getCalificaciones(filtro);
                }
            this.formEnviar.get('sede_id').setValue(this.form.get('sede_id').value);
            this.formEnviar.get('grado_id').setValue(this.form.get('grado_id').value);
            this.formEnviar.get('asignatura_id').setValue(this.form.get('asignatura_id').value);
            this.formEnviar.get('periodo_id').setValue(this.form.get('periodo_id').value);
        } else {
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Formulario inválido. Verifique los campos.',
                life: 3000,
            });
        }
    }



    reiniciaComponensHijos(): void {
        this.sedeComponent.reiniciarComponente();
        this.gradosComponent.reiniciarComponente();
        this.asignaturasComponent.reiniciarComponente();
        this.periodoComponent.reiniciarComponente();
    }

    reinicarFormulario() {
        this.iid = '';
        this.form.reset();
        this.formEnviar.reset();
        this.reiniciaComponensHijos();
        this.data=[];
        this.logroCognitivo="";
        this.listadoLogros=[];
        this.dataLogros=[];
    }

    onSubmitEnviar() {
        //console.log(this.formEnviar.value);
        if (this.formEnviar.valid) {
            this.mostrarLoading=true;
            setTimeout(() => {
                this.cargarMatriculas();
                let datos = this.formEnviar.value;
                datos.matriculas=this.matriculas;
                //console.log(datos);
                this.crear(datos);
                this.mostrarLoading=false;
            }, 2500);
        } else {
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Formulario inválido. Verifique los campos.',
                life: 3000,
            });
        }
    }

    edit(item: any) {}
    seleccionar(item: any) {
       if(this.tipologro==1){
        this.logro_afe.at(this.posicion).setValue(item.id);
       }else{
        this.formEnviar.get('logro_cog').setValue(item.id);
        this.logroCognitivo=item.descripcion;
       }
       this.modalLogros=false;
    }

    seleccionarTodo(opcion:any) {
        switch (opcion) {
            case 1:
                let valor= this.logro_afe.at(0).value;
                //console.log(valor);
                if(valor!="" || valor==0){
                 for (let index = 0; index < this.data.length; index++) {
                     this.logro_afe.at(index).setValue(valor);
                 }
                }
            break;
            case 2:
                 for (let index = 1; index < this.data.length; index++) {
                     this.logro_afe.at(index).setValue('');
                    }

            break;
        }

    }

    repetirNota(opcion:any) {
        switch (opcion) {
            case 1:
                let valor= this.notas.at(0).value;
                if(valor!=""){
                 for (let index = 0; index < this.data.length; index++) {
                     this.notas.at(index).setValue(valor);
                 }
                }
            break;
            case 2:
                 for (let index = 1; index < this.data.length; index++) {
                     this.notas.at(index).setValue('');
                    }

            break;
        }

    }



    reporteArea(sede:any, grado:any, asignatura:any, periodo:any) {
        let filtro={
            'sede_id':sede,
            'grado_id':grado,
            'asignatura_id':asignatura,
            'periodo_id':periodo,
        }
        this.reporteService
            .reporteAreaPeriodo(filtro)
            .pipe(finalize(() => this.downloadFile(this.pdf, 'ReporteArea.pdf')))
            .subscribe(
                (response) => {
                    //console.log(response.pdf);
                    this.pdf = response.pdf;
                    if(response.code==200){
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Reporte Generado Exitosamente',
                            detail: response.message,
                            life: 3000,
                        });
                    }else{
                        this.messageService.add({
                            severity: 'warn',
                            summary: 'Advertencia',
                            detail: response.message,
                            life: 3000,
                        });
                    }
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

    reporteNotas(sede:any, grado:any, asignatura:any, periodo:any) {
        let filtro={
            'sede_id':sede,
            'grado_id':grado,
            'asignatura_id':asignatura,
            'periodo_id':periodo,
        }
        let nombre='ReporteNotas_'+grado+'.pdf'
        this.reporteService
            .reporteCalificaciones(filtro)
            .pipe(finalize(() => this.downloadFile(this.pdf, nombre)))
            .subscribe(
                (response) => {
                    //console.log(response.pdf);
                    this.pdf = response.pdf;
                    if(response.code==200){
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Reporte Generado Exitosamente',
                            detail: response.message,
                            life: 3000,
                        });
                    }else{
                        this.messageService.add({
                            severity: 'warn',
                            summary: 'Advertencia',
                            detail: response.message,
                            life: 3000,
                        });
                    }
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
        if(base64!==undefined || base64!=""){
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

}
