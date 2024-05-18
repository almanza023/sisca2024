import { Component, ViewChild, SimpleChanges } from '@angular/core';
import { finalize } from 'rxjs';

import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';

import { CargaService } from 'src/app/core/services/carga.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectorSedeComponent } from 'src/app/shared/components/selector-sede/selector-sede.component';
import { SelectorGradosComponent } from 'src/app/shared/components/selector-grados/selector-grados.component';
import { SelectorAsignaturasComponent } from 'src/app/shared/components/selector-asignaturas/selector-asignaturas.component';
import { SelectorDocentesComponent } from 'src/app/shared/components/selector-docentes/selector-docentes.component';

@Component({
    selector: 'app-cargas',
    templateUrl: './cargas.component.html',
    providers: [MessageService],
})
export class CargasComponent {
    clienteDialog: boolean = false;
    deleteProductDialog: boolean = false;
    deleteProductsDialog: boolean = false;

    data: any[] = [];
    carga: any = {};
    municipio: any = {};
    tipo: any = {};

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
    api: string = 'NO';
    form: FormGroup;
    formEdit: FormGroup;
    iid:any;

    nombreModulo: string = 'Módulo de Carga Académica';
    @ViewChild('sedes') sedeComponent: SelectorSedeComponent;
    @ViewChild('grados') gradosComponent: SelectorGradosComponent;
    @ViewChild('asignaturas')
    asignaturasComponent: SelectorAsignaturasComponent;
    @ViewChild('docentes') docentesCompenet: SelectorAsignaturasComponent;

    @ViewChild(SelectorGradosComponent) gradoComponent: SelectorGradosComponent;
    @ViewChild(SelectorAsignaturasComponent) asignaturaComponent: SelectorAsignaturasComponent;

    constructor(
        private cargaService: CargaService,
        private messageService: MessageService,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        this.getDataAll();
        this.cols = [
            { field: 'id', header: 'Código' },
            { field: 'descripcion', header: 'Descripción' },
            { field: 'estado', header: 'Estado' },
        ];

        this.statuses = [];
        this.form = this.fb.group({
            sede_id: [''],
            grado_id: [''],
            docente_id: [''],
            asignatura_id: [''],
        });

        this.formEdit = this.fb.group({
            sede_id: ['', Validators.required],
            grado_id: ['', Validators.required],
            docente_id: ['', Validators.required],
            asignatura_id: ['', Validators.required],
            ihs: ['', Validators.required],
            porcentaje: ['', Validators.required],
        });
    }

    ngOnChanges(changes: SimpleChanges): void {}

    getValores(event, operacion) {
        switch (operacion) {
            case 'sede':
                if (event != null) {
                    this.form.get('sede_id').setValue(event.id);
                    //this.formEnviar.get('sede_id').setValue(event.id);
                    this.gradoComponent.getGradosBySede(event.id);
                    this.gradosComponent.getData();
                }
                break;
            case 'grado':
                if (event != null) {
                    this.form.get('grado_id').setValue(event.id);
                    //this.formEnviar.get('grado_id').setValue(event.id);
                    this.asignaturaComponent.getAsignaturasBySedeAndGrado(
                        this.form.get('sede_id').value,
                        event.id
                    );
                    this.asignaturasComponent.getData();
                }
                break;
            case 'asignatura':
                if (event != null) {
                    this.form.get('asignatura_id').setValue(event.id);
                    //this.formEnviar.get('asignatura_id').setValue(event.id);
                }
                break;
            case 'docente':
                if (event != null) {
                    this.form.get('docente_id').setValue(event.id);
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
            case 'docente':
                this.formEdit.get('docente_id').setValue(event.id);
                break;
        }
    }

    getDataAll() {
        this.cargaService.getAll().subscribe(
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
        console.log(this.carga);
        this.sedeComponent.filtrar(this.carga.sede.id);
        this.gradosComponent.filtrar(this.carga.grado.id);
        this.asignaturasComponent.filtrar(this.carga.asignatura.id);
        this.docentesCompenet.filtrar(this.carga.docente.id);
        this.formEdit.patchValue(this.carga);
    }

    bloqueoCliente(cliente: any) {
        this.deleteProductDialog = true;
        this.carga = { ...cliente };
        this.carga.cambio_estado = true;
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.cargaService
            .cambiarEstado(this.carga)
            .pipe(finalize(() => this.getDataAll()))
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
        this.cargaService
            .postData(item)
            .pipe(finalize(() => this.getDataAll()))
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
        this.cargaService
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
        let filtro = this.form.value;
        this.filtrarDatos(filtro);
    }

    filtrarDatos(filtro: any) {
        this.cargaService.filtrar(filtro).subscribe(
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
        this.docentesCompenet.reiniciarComponente();
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
