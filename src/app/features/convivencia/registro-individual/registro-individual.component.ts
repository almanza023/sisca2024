import { Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { finalize } from 'rxjs';
import { CargaService } from 'src/app/core/services/carga.service';
import { ConvivenciaService } from 'src/app/core/services/convivencia.service';
import { LogrosDisciplinariosService } from 'src/app/core/services/logros-disciplinarios.service';
import { SelectorGradosComponent } from 'src/app/shared/components/selector-grados/selector-grados.component';
import { SelectorPeriodoComponent } from 'src/app/shared/components/selector-periodo/selector-periodo.component';
import { SelectorSedeComponent } from 'src/app/shared/components/selector-sede/selector-sede.component';

@Component({
    selector: 'app-registro-individual',
    templateUrl: './registro-individual.component.html',
    providers: [MessageService],
})
export class RegistroIndividualComponent {

    operacion:any;
    clienteDialog: boolean = false;
    deleteProductDialog: boolean = false;
    deleteProductsDialog: boolean = false;

    data: any[] = [];

    selectedProducts: any[] = [];

    cols: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    form: FormGroup;
    formEnviar: FormGroup;
    confirmacionModal: boolean = false;
    sede: any;


    nombreModulo: string = 'Convivencia Escolar Individual';
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
    asignaturasListado:any=[];
    calificacionesPeriodo:any=[];
    asignaturas:any=[];
    mostrarLoading:boolean=false;
    nombreEstudiante:any="";


    constructor(
        private convivenciaService: ConvivenciaService,
        private cargarService: CargaService,
        private logroService: LogrosDisciplinariosService,
        private messageService: MessageService,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        //this.getDataAll();
        this.cols = [
            { field: 'id', header: 'Código' },
            { field: 'descripcion', header: 'Descripción' },
            { field: 'estado', header: 'Estado' },
        ];


        this.form = this.fb.group({
            sede_id: ['', Validators.required],
            grado_id: ['', Validators.required],
            periodo_id: ['', Validators.required],
        });

        this.formEnviar = this.fb.group({
            sede_id: ['', Validators.required],
            grado_id: ['', Validators.required],
            periodo_id: ['', Validators.required],
            logro: [, Validators.required],
            matricula_id: ['', Validators.required],
        });
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




    getEstudiantes(item: any) {
        this.data=[];
        this.convivenciaService
            .getListadoEstudiantes(item)
            .pipe(finalize(() => this.getLogros(item)))
            .subscribe(
                (response) => {
                    console.log(response.data);
                    this.data = response.data;
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


    getCalificacionByMatricula(item: any) {
        this.convivenciaService
            .getNotaByMatricula(item)
            .pipe(finalize(() => this.cargarInputs()))
            .subscribe(
                (response) => {
                    console.log(response.data);
                    this.asignaturas = response.data;
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

    cargarInputs() {

        if (this.asignaturas.length > 0) {
            this.formEnviar.get('logro').setValue(this.asignaturas[0].logro);
        }

    }

    crear(item: any) {
        this.convivenciaService
            .postDataIndividual(item)
            .pipe(finalize(() => this.reinicarFormulario()))
            .subscribe(
                (response) => {

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

    clearControls() {
        this.formEnviar.get('logro').setValue('');
      }

    onSubmit() {

        if (this.form.valid) {
                this.data=[];
                this.clearControls();
                this.logroCognitivo='';
                this.formEnviar.reset();
                let filtro = this.form.value;
                this.getEstudiantes(filtro);
                //this.getAsignaturas(filtro);
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
        this.modalDetalle=false;

    }

    cargarAsignaturas(){
        this.asignaturasListado=[];
        for (let index = 0; index < this.asignaturas.length; index++) {
            const element = this.asignaturas[index].id;
            this.asignaturasListado.push(element);

        }
    }

    onSubmitEnviar() {
        console.log(this.formEnviar.value);
        if (this.formEnviar.valid) {
            this.modalDetalle=false;
            this.mostrarLoading=true;
            setTimeout(() => {
                let datos = this.formEnviar.value;
                this.cargarAsignaturas();
                datos.asignaturas=this.asignaturasListado;
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

    edit(item: any) {}


    openModalCalificar(item:any){
        this.nombreEstudiante=item.apellidos+" "+item.nombres;
        let datos={
            matricula_id:item.id,
            periodo_id: this.form.get('periodo_id').value
        };
        this.mostrarLoading=true;
        setTimeout(() => {
            this.getCalificacionByMatricula(datos);
            this.modalDetalle=true;
            this.formEnviar.get('matricula_id').setValue(item.id);
            this.mostrarLoading=false;
        }, 2000);

    }

    seleccionar(item:any){
        this.formEnviar.get('logro').setValue(item.id);
        this.modalLogros=false;
    }



}
