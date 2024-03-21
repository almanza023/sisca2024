import { Component, ViewChild, SimpleChanges } from '@angular/core';
import { finalize } from 'rxjs';

import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';


import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectorSedeComponent } from 'src/app/shared/components/selector-sede/selector-sede.component';
import { SelectorGradosComponent } from 'src/app/shared/components/selector-grados/selector-grados.component';
import { MatriculasService } from 'src/app/core/services/matriculas.service';
import { SelectorGenericoComponent } from 'src/app/shared/components/selector-generico/selector-generico.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-matriculas',
    templateUrl: './matriculas.component.html',
    providers: [MessageService],
})
export class matriculasComponent {
    clienteDialog: boolean = false;
    deleteProductDialog: boolean = false;
    deleteProductsDialog: boolean = false;

    data: any[] = [];
    matricula: any = {};

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
    itemsSiNo:any=[];

    nombreModulo: string = 'Módulo de Carga Académica';
    @ViewChild('sedes') sedeComponent: SelectorSedeComponent;
    @ViewChild('grados') gradosComponent: SelectorGradosComponent;
    @ViewChild('repitente') repitenteComponent: SelectorGenericoComponent;
    @ViewChild('cambioSede') cambioSedeComponent: SelectorGenericoComponent;

    constructor(
        private matriculaService: MatriculasService,
        private messageService: MessageService,
        private fb: FormBuilder,
        private router:Router
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
        });

        this.formEdit = this.fb.group({
            sede_id: ['', Validators.required],
            grado_id: ['', Validators.required],
            folio: ['', Validators.required],
            repitente: ['', Validators.required],
            cambio_sede: ['', Validators.required],
        });

        this.itemsSiNo = [
            { id: 1, descripcion: 'SI' },
            { id: 2, descripcion: 'NO' },
        ];
    }

    ngOnChanges(changes: SimpleChanges): void {}

    getValores(event, operacion) {
        switch (operacion) {
            case 'sede':
                this.form.get('sede_id').setValue(event.id);
                break;
            case 'grado':
                this.form.get('grado_id').setValue(event.id);
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
            case 'repitente':
                this.formEdit.get('repitente').setValue(event.descripcion);
                break;
            case 'cambio_sede':
                this.formEdit.get('cambio_sede').setValue(event.descripcion);
                break;
        }
    }

    getDataAll() {
        this.matriculaService.getAll().subscribe(
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

    openNew(id:any) {
        this.router.navigate(['/matriculas/registro/'+id])
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(item: any) {
        console.log(item);
        this.matricula = { ...item };
        this.clienteDialog = true;
        this.matricula.editar = true;
        this.iid=this.matricula.id;

        this.sedeComponent.filtrar(this.matricula.sede_id);
        this.gradosComponent.filtrar(this.matricula.grado_id);
        this.repitenteComponent.filtrar(this.matricula.repitente);
        this.cambioSedeComponent.filtrar(this.matricula.cambio_sede);
        this.formEdit.patchValue(this.matricula);
    }

    bloqueoCliente(cliente: any) {
        this.deleteProductDialog = true;
        this.matricula = { ...cliente };
        this.matricula.cambio_estado = true;
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.matriculaService
            .cambiarEstado(this.matricula)
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
        this.matricula = {};
    }

    hideDialog() {
        this.clienteDialog = false;
        this.submitted = false;
    }

    crear(item: any) {
        this.matriculaService
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
        this.matriculaService
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
        this.matriculaService.filtrar(filtro).subscribe(
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
            this.matricula = this.formEdit.value;
            this.matricula.id=this.iid;
            console.log(this.matricula);
            this.actualizar(this.matricula);
            this.clienteDialog = false;
            this.matricula = {};
            this.seleccionado = {};
            this.iid="";
            this.reinicarFormulario();
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
        this.repitenteComponent.reiniciarComponente();
        this.cambioSedeComponent.reiniciarComponente();
    }

    reinicarFormulario() {
        this.formEdit.reset();
        this.reiniciaComponensHijos();
    }
}
