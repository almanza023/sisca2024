import { Component, ViewChild, SimpleChanges } from '@angular/core';
import { finalize } from 'rxjs';

import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';


import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectorSedeComponent } from 'src/app/shared/components/selector-sede/selector-sede.component';
import { SelectorGradosComponent } from 'src/app/shared/components/selector-grados/selector-grados.component';
import { SelectorAsignaturasComponent } from 'src/app/shared/components/selector-asignaturas/selector-asignaturas.component';
import { SelectorPeriodoComponent } from 'src/app/shared/components/selector-periodo/selector-periodo.component';
import { NivelacionService } from 'src/app/core/services/nivelacion.service';

@Component({
    selector: 'app-nivelaciones',
    templateUrl: './nivelaciones.component.html',
    providers: [MessageService],
})
export class NivelacionesComponent {
    clienteDialog: boolean = false;
    deleteProductDialog: boolean = false;
    deleteProductsDialog: boolean = false;

    data: any[] = [];
    nota: any = {};
    selectedProducts: any[] = [];
    submitted: boolean = false;
    cols: any[] = [];

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
    nombreModulo: string = 'Módulo de Nivelaciones';
    rol:any;

    @ViewChild(SelectorSedeComponent) sedeComponent: SelectorSedeComponent;
    @ViewChild(SelectorGradosComponent) gradosComponent: SelectorGradosComponent;
    @ViewChild(SelectorAsignaturasComponent)  asignaturasComponent: SelectorAsignaturasComponent;
    @ViewChild(SelectorPeriodoComponent) periodoComponent: SelectorPeriodoComponent;


    constructor(
        private nivelacionService: NivelacionService,
        private messageService: MessageService,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        this.cols = [
            { field: 'id', header: 'Código' },
            { field: 'descripcion', header: 'Descripción' },
            { field: 'estado', header: 'Estado' },
        ];

        this.rol=localStorage.getItem("rol")!;
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

    getDataAll(item:any) {
        this.nivelacionService.getCalificacionesPeriodo(item).subscribe(
            (response) => {
                //console.log(response.data);
                if(response.code==300){
                    this.messageService.add({
                        severity: 'warn',
                        summary: 'Advertencia',
                        detail: response.message,
                        life: 3000,
                    });
                }
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



    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }



    bloqueoCliente(cliente: any) {
        this.deleteProductDialog = true;
        this.nota = { ...cliente };
        this.nota.cambio_estado = true;
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.nivelacionService
            .delete(this.nota.id)
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
        this.nota = {};
    }

    hideDialog() {
        this.clienteDialog = false;
        this.submitted = false;
    }




    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    onSubmit() {
        let filtro = this.form.value;
        this.getDataAll(filtro);
    }

    filtrarDatos(filtro: any) {
        this.nivelacionService.filtrar(filtro).subscribe(
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
            this.nota = this.formEdit.value;
            this.nota.id=this.iid;

            this.clienteDialog = false;
            this.nota = {};
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
