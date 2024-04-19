import { Component, ViewChild } from '@angular/core';
import { finalize } from 'rxjs';

import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { AsignaturasService } from 'src/app/core/services/asignaturas.service';
import { SelectorTipoAsignaturaComponent } from 'src/app/shared/components/selector-tipo-asignatura/selector-tipo-asignatura.component';

@Component({
    selector: 'app-asignasturas',
    templateUrl: './asignaturas.component.html',
    providers: [MessageService],
})
export class AsignaturasComponent {
    clienteDialog: boolean = false;
    deleteProductDialog: boolean = false;
    deleteProductsDialog: boolean = false;

    data: any[] = [];

    descripcion: string;
    asignatura: any = {};
    selectedProducts: any[] = [];
    submitted: boolean = false;
    cols: any[] = [];
    statuses: any[] = [];
    seleccionado: any = {};
    item: any = {};
    rowsPerPageOptions = [5, 10, 20];

    nombreModulo: string = 'Módulo de Aréas/Asignaturas';
    @ViewChild(SelectorTipoAsignaturaComponent) tipoComponent: SelectorTipoAsignaturaComponent;

    constructor(
        private asignaturaService: AsignaturasService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.getDataAll();
        this.cols = [
            { field: 'id', header: 'Código' },
            { field: 'descripcion', header: 'Descripción' },
            { field: 'estado', header: 'Estado' },
        ];

        this.statuses = [];
    }

    getDataAll() {
        this.asignaturaService.getAll().subscribe(
            (response) => {
                //console.log(response.data);
                this.data = response.data;
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
    }

    getTipo(event){
        this.asignatura.tipo_asignatura_id=event.id;
    }

    openNew() {
        this.asignatura = {};
        this.asignatura.editar = false;
        this.submitted = false;
        this.clienteDialog = true;
        this.seleccionado = {};
        this.tipoComponent.reiniciarComponente();
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(item: any) {
        this.asignatura = { ...item };
        this.clienteDialog = true;
        this.asignatura.editar = true;
        this.tipoComponent.filtrar(this.asignatura.tipo.id);
    }

    bloqueoCliente(cliente: any) {
        this.deleteProductDialog = true;
        this.asignatura = { ...cliente };
        this.asignatura.cambio_estado = true;
    }

    confirmDeleteSelected() {
        this.deleteProductsDialog = false;
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Products Deleted',
            life: 3000,
        });
        this.selectedProducts = [];
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.asignaturaService
            .cambiarEstado(this.asignatura)
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
        this.asignatura = {};
    }

    hideDialog() {
        this.clienteDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;
        this.asignatura.user = localStorage.getItem('user_id');
        if (this.asignatura.nombre == undefined) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe ingresar una descripción',
                life: 3000,
            });
            return;
        }
        if (this.asignatura.acronimo == undefined) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe ingresar un Acrónimo',
                life: 3000,
            });
            return;
        }

        if (this.asignatura.tipo_asignatura_id == undefined) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe Seleccionar un Tipo de Asignatura',
                life: 3000,
            });
            return;
        }

        if (this.asignatura.id == undefined) {
            this.crear(this.asignatura);
        } else {
            this.actualizar(this.asignatura);
        }
        //this.clientes = [...this.clientes];
        this.clienteDialog = false;
        this.asignatura = {};
        this.seleccionado = {};
        this.tipoComponent.reiniciarComponente();
    }

    crear(item: any) {
        this.asignaturaService
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
                        detail: error.error.data,
                        life: 3000,
                    });
                }
            );
    }

    actualizar(item: any) {
        this.asignaturaService
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
                        detail: error.error.data,
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
}
