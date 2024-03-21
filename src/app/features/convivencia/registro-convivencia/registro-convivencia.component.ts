import { Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { finalize } from 'rxjs';
import { ConvivenciaService } from 'src/app/core/services/convivencia.service';
import { LogrosDisciplinariosService } from 'src/app/core/services/logros-disciplinarios.service';


import { SelectorGradosComponent } from 'src/app/shared/components/selector-grados/selector-grados.component';
import { SelectorPeriodoComponent } from 'src/app/shared/components/selector-periodo/selector-periodo.component';
import { SelectorSedeComponent } from 'src/app/shared/components/selector-sede/selector-sede.component';

@Component({
    selector: 'app-registro-convivencia',
    templateUrl: './registro-convivencia.component.html',
    providers: [MessageService],
})
export class RegistroConvivenciaComponent {

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

    nombreModulo: string = 'Registro de Convivencia Escolar por Grado';
    @ViewChild(SelectorSedeComponent) sedeComponent: SelectorSedeComponent;
    @ViewChild(SelectorGradosComponent)
    gradosComponent: SelectorGradosComponent;

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


    constructor(
        private convivenciaService: ConvivenciaService,
        private logroService: LogrosDisciplinariosService,
        private messageService: MessageService,
        private route: ActivatedRoute,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        //this.getDataAll();

        this.route.paramMap.subscribe(params => {
            this.operacion = params.get('operacion');

            if(this.operacion=="editar"){
                this.nombreModulo="Actualización de Convivencia Escolar"
            }
            console.log(this.operacion);

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
            periodo_id: ['', Validators.required],
        });

        this.formEnviar = this.fb.group({
            sede_id: ['',Validators.required],
            grado_id: ['',Validators.required],
            periodo_id: ['',Validators.required],
            logros: this.fb.array([], Validators.required),
        });
    }

    get logros(): FormArray {
        return this.formEnviar.get('logros') as FormArray;
    }



    getValores(event, operacion) {
        switch (operacion) {
            case 'sede':
                if (event != null) {
                    this.form.get('sede_id').setValue(event.id);
                    this.formEnviar.get('sede_id').setValue(event.id);
                    this.gradosComponent.limpiar();
                    this.gradosComponent.getDireccionesGrados();
                    this.sede = event.id;
                }
                break;
            case 'grado':
                if (event != null) {
                    this.form.get('grado_id').setValue(event.id);
                    this.formEnviar.get('grado_id').setValue(event.id);
                }
                break;
            case 'periodo':
                if (event != null) {
                    this.form.get('periodo_id').setValue(event.id);
                    this.formEnviar.get('periodo_id').setValue(event.id);
                }
                break;
        }
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }
    openModalLogros(index:any) {
        this.posicion=index;
        this.modalLogros = true;
    }

    bloqueoCliente(item: any) {
        this.deleteProductDialog = true;
        this.calificacion = { ...item };
        this.calificacion.cambio_estado = true;
    }



    getEstudiantes(item: any) {
        this.data=[];
        this.convivenciaService
            .getMatriculasBySedeAndGrado(item)
            .pipe(finalize(() => this.cargarInputs()))
            .subscribe(
                (response) => {
                    console.log(response.data);
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
        this.convivenciaService
            .getCalificacionesPeriodo(item)
            .pipe(finalize(() => this.cargarInputs()))
            .subscribe(
                (response) => {
                    console.log(response.data);
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
                    console.log(response.data);
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
        const arrayLength = this.logros.length;
        for (let i = arrayLength - 1; i >= 0; i--) {
          this.logros.removeAt(i);
        }
      }

    cargarInputs() {
        if (this.data.length > 0) {
            if(this.logros.length==0){
                for (let index = 0; index < this.data.length; index++) {
                    if(this.operacion=='guardar'){
                        this.logros.push(
                            this.fb.control('', [
                                Validators.required
                            ])
                        );
                    }else{
                        this.logros.push(
                            this.fb.control(this.data[index].logro, [
                                Validators.required,
                            ])
                        );
                    }
                }
            }

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
        this.convivenciaService
            .postData(item)
            .pipe(finalize(() => this.reinicarFormulario()))
            .subscribe(
                (response) => {
                    this.modalDetalle=true;
                    this.dataNotas=response.data;
                    console.log(response.data);
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
        console.log(this.form.value);
        if (this.form.valid) {
                this.data=[];
                this.clearControls();
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
        console.log(this.formEnviar.value);
        console.log(this.formEnviar);
        if (this.formEnviar.errors==null) {
            this.mostrarLoading=true;
            setTimeout(() => {
                this.cargarMatriculas();
                let datos = this.formEnviar.value;
                datos.matriculas=this.matriculas;
                //Asignatira de Disciplina
                datos.asignatura_id=29;
                console.log(datos);
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


    seleccionar(item: any) {
        this.logros.at(this.posicion).setValue(item.id);
        this.modalLogros=false;
    }



    repetirNota(opcion:any) {
        switch (opcion) {
            case 1:
                let valor= this.logros.at(0).value;
                if(valor!=""){
                 for (let index = 0; index < this.data.length; index++) {
                     this.logros.at(index).setValue(valor);
                 }
                }
            break;
            case 2:
                 for (let index = 1; index < this.data.length; index++) {
                     this.logros.at(index).setValue('');
                    }

            break;
        }

    }

}
