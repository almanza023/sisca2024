import { Component, ViewChild, SimpleChanges } from '@angular/core';
import { finalize } from 'rxjs';

import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';

import { CargaService } from 'src/app/core/services/carga.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectorSedeComponent } from 'src/app/shared/components/selector-sede/selector-sede.component';
import { SelectorGradosComponent } from 'src/app/shared/components/selector-grados/selector-grados.component';
import { SelectorAsignaturasComponent } from 'src/app/shared/components/selector-asignaturas/selector-asignaturas.component';
import { SelectorPeriodoComponent } from 'src/app/shared/components/selector-periodo/selector-periodo.component';
import { SelectorTipoLogroAcademicoComponent } from 'src/app/shared/components/selector-tipo-logro-academico/selector-tipo-logro-academico.component';
import { LogrosDisciplinariosService } from 'src/app/core/services/logros-disciplinarios.service';

@Component({
    selector: 'app-logros-disciplinarios',
    templateUrl: './logros-disciplinarios.component.html',
    providers: [MessageService],
})
export class LogrosDisciplinariosComponent {
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
    api: string = 'NO';
    form: FormGroup;
    formEdit: FormGroup;
    iid:any;

    nombreModulo: string = 'Módulo de Logros Disciplinarios';
    @ViewChild('sedes') sedeComponent: SelectorSedeComponent;
    @ViewChild(SelectorGradosComponent) gradosComponent: SelectorGradosComponent;
    @ViewChild('grados') gradosEditComponent: SelectorGradosComponent;
    @ViewChild('asignaturas')  asignaturasComponent: SelectorAsignaturasComponent;
    @ViewChild('periodo') periodoComponent: SelectorPeriodoComponent;

    constructor(
        private logroService: LogrosDisciplinariosService,
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
            periodo_id: [''],
            asignatura_id: [''],
        });

        this.formEdit = this.fb.group({
            sede_id: ['', Validators.required],
            grado_id: ['', Validators.required],
            periodo_id: ['', Validators.required],
            asignatura_id: ['', Validators.required],
            descripcion: ['', Validators.required],
        });
    }

    ngOnChanges(changes: SimpleChanges): void {}

    getValores(event, operacion) {
        switch (operacion) {
            case 'sede':
               if(event!=null){
                this.form.get('sede_id').setValue(event.id);
                this.gradosComponent.getGradosBySede(event.id);
                this.gradosEditComponent.getGradosBySede(event.id);
               }
                break;
            case 'grado':
                if(event!=null){
                this.form.get('grado_id').setValue(event.id);
                }
                break;
            case 'asignatura':
                if(event!=null){
                this.form.get('asignatura_id').setValue(event.id);
                }
                break;
            case 'periodo':
                if(event!=null){
                this.form.get('periodo_id').setValue(event.id);
                }
                break;
        }
    }

    getValoresEdit(event, operacion) {
        switch (operacion) {
            case 'sede':
                if(event!=null){
                this.formEdit.get('sede_id').setValue(event.id);
                this.gradosComponent.getGradosBySede(event.id);
                }
                break;
            case 'grado':
                if(event!=null){
                this.formEdit.get('grado_id').setValue(event.id);
                }
                break;
            case 'asignatura':
                if(event!=null){
                this.formEdit.get('asignatura_id').setValue(event.id);
                }
                break;
            case 'periodo':
                if(event!=null){
                this.formEdit.get('periodo_id').setValue(event.id);
                }
                break;
        }
    }

    getDataAll() {
        this.logroService.getAll().subscribe(
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
        console.log(item);
        this.carga = { ...item };
        this.clienteDialog = true;
        this.carga.editar = true;
        this.iid=this.carga.id;
        this.formEdit.patchValue(this.carga);
        this.sedeComponent.filtrar(this.carga.sede_id);
        this.gradosEditComponent.filtrar(this.carga.grado_id);
        this.periodoComponent.filtrar(this.carga.periodo_id);

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
        this.logroService
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
        this.logroService
            .putData(item)
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
        this.logroService.filtrar(filtro).subscribe(
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
