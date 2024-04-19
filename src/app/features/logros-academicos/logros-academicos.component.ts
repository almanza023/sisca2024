import { Component, ViewChild, SimpleChanges } from '@angular/core';
import { finalize } from 'rxjs';

import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';

import { CargaService } from 'src/app/core/services/carga.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectorSedeComponent } from 'src/app/shared/components/selector-sede/selector-sede.component';
import { SelectorGradosComponent } from 'src/app/shared/components/selector-grados/selector-grados.component';
import { SelectorAsignaturasComponent } from 'src/app/shared/components/selector-asignaturas/selector-asignaturas.component';
import { LogrosAcademicosService } from 'src/app/core/services/logros-academicos.service';
import { SelectorPeriodoComponent } from 'src/app/shared/components/selector-periodo/selector-periodo.component';
import { SelectorTipoLogroAcademicoComponent } from 'src/app/shared/components/selector-tipo-logro-academico/selector-tipo-logro-academico.component';

@Component({
    selector: 'app-logros-academicos',
    templateUrl: './logros-academicos.component.html',
    providers: [MessageService],
})
export class LogrosAcademicosComponent {
    clienteDialog: boolean = false;
    deleteProductDialog: boolean = false;
    deleteProductsDialog: boolean = false;

    data: any[] = [];
    carga: any = {};
    selectedProducts: any[] = [];
    submitted: boolean = false;
    cols: any[] = [];
    statuses: any[] = [];
    seleccionado: any = {};
    item: any = {};
    rowsPerPageOptions = [5, 10, 20];
    stateOptions: any[] = [
        { label: 'Si', value: 'SI' },
        { label: 'No', value: 'NO' },
    ];
    form: FormGroup;
    formEdit: FormGroup;
    iid:any;

    nombreModulo: string = 'Módulo de Logros Académicos';
    @ViewChild(SelectorSedeComponent) sedeComponent: SelectorSedeComponent;
    @ViewChild(SelectorGradosComponent) gradosComponent: SelectorGradosComponent;
    @ViewChild(SelectorAsignaturasComponent)  asignaturasComponent: SelectorAsignaturasComponent;
    @ViewChild(SelectorPeriodoComponent) periodoComponent: SelectorPeriodoComponent;
    @ViewChild('tipologro') tipoLogroComponent: SelectorTipoLogroAcademicoComponent;

    constructor(
        private logroService: LogrosAcademicosService,
        private messageService: MessageService,
        private fb: FormBuilder
    ) {}

    ngOnInit() {

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
            asignatura_id: ['', Validators.required],
        });

        this.formEdit = this.fb.group({
            sede_id: ['', Validators.required],
            grado_id: ['', Validators.required],
            periodo_id: ['', Validators.required],
            asignatura_id: ['', Validators.required],
            descripcion: ['', Validators.required],
            tipo_logro_id: ['', Validators.required],
        });
    }

    ngOnChanges(changes: SimpleChanges): void {}

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
                    //this.formEnviar.get('grado_id').setValue(event.id);
                    this.asignaturasComponent.getAsignaturasBySedeAndGrado(
                        this.form.get('sede_id').value,
                        event.id
                    );
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
        }
    }

    getValoresEdit(event, operacion) {
        switch (operacion) {
            case 'sede':
                this.formEdit.get('sede_id').setValue(event.id);
                break;
            case 'grado':
                this.formEdit.get('grado_id').setValue(event.id);
                break;
            case 'asignatura':
                this.formEdit.get('asignatura_id').setValue(event.id);
                break;
            case 'periodo':
                this.formEdit.get('periodo_id').setValue(event.id);
                break;
                case 'tipologro':
                    this.formEdit.get('tipo_logro_id').setValue(event.id);
                    break;
        }
    }



    openNew() {
        this.carga = {};
        this.carga.editar = false;
        this.submitted = false;
        this.clienteDialog = true;
        this.seleccionado = {};
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(item: any) {
        //console.log(item);
        this.carga = { ...item };
        this.clienteDialog = true;
        this.carga.editar = true;
        this.iid=this.carga.id;

        this.sedeComponent.filtrar(this.carga.sede_id);
        this.gradosComponent.filtrar(this.carga.grado_id);
        this.asignaturasComponent.filtrar(this.carga.asignatura_id);
        this.periodoComponent.filtrar(this.carga.periodo_id);
        this.tipoLogroComponent.filtrar(this.carga.tipo_logro_id);
        this.formEdit.patchValue(this.carga);
    }

    bloqueoCliente(cliente: any) {
        this.deleteProductDialog = true;
        this.carga = { ...cliente };
        this.carga.cambio_estado = true;
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.logroService
            .cambiarEstado(this.carga)
            .pipe(finalize(() => this.onSubmit()))
            .subscribe(
                (response) => {
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
                        detail: error.error.data,
                        life: 3000,
                    });
                }
            );
        this.carga = {};
    }

    hideDialog() {
        this.clienteDialog = false;
        this.submitted = false;
    }

    crear(item: any) {
        this.logroService
            .postData(item)
            .pipe(finalize(() => this.onSubmit()))
            .subscribe(
                (response) => {
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

    actualizar(item: any) {
        this.logroService
            .putData(item)
            .pipe(finalize(() => this.onSubmit()))
            .subscribe(
                (response) => {
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
        if(this.form.valid){
            let filtro = this.form.value;
            this.filtrarDatos(filtro);
        }else{
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: "Debe seleccionar todos los datos del formulario",
                life: 3000,
            });
        }
    }

    filtrarDatos(filtro: any) {
        this.logroService.filtrar(filtro).subscribe(
            (response) => {
                //console.log(response.data);
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

    onSubmitEditar() {
        if (this.formEdit.valid) {
            this.carga = this.formEdit.value;
            this.carga.id=this.iid;
            this.actualizar(this.carga);
            this.clienteDialog = false;
            this.carga = {};
            this.seleccionado = {};
            this.iid="";
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
        this.tipoLogroComponent.reiniciarComponente();
    }

    reinicarFormulario() {
        this.formEdit.reset();
        this.formEdit.get('sede_id').setValue('');
        this.formEdit.get('grado_id').setValue('');
        this.formEdit.get('asignaturas_id').setValue('');
        this.formEdit.get('docente_id').setValue('');
        this.formEdit.get('ihs').setValue('');
        this.formEdit.get('porcentaje').setValue('');
        this.reiniciaComponensHijos();
    }


}
