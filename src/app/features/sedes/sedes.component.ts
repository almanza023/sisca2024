import { Component, ViewChild } from '@angular/core';
import { finalize } from 'rxjs';

import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';

import { RangoFechaComponent } from 'src/app/shared/components/rango-fecha/rango-fecha.component';
import { SedeService } from 'src/app/core/services/sede.service';

@Component({
    selector: 'app-sedes',
    templateUrl: './sedes.component.html',
    providers: [MessageService],
})
export class SedesComponent {
    clienteDialog: boolean = false;
    deleteProductDialog: boolean = false;
    deleteProductsDialog: boolean = false;

    data: any[] = [];

    descripcion: string;
    sede: any = {};
    selectedProducts: any[] = [];
    submitted: boolean = false;
    cols: any[] = [];
    statuses: any[] = [];
    seleccionado: any = {};
    item: any = {};
    rowsPerPageOptions = [5, 10, 20];

    nombreModulo: string = 'Módulo de Sedes';
    @ViewChild('datosDesdeElPadre', { static: false })
    datosDesdeElPadre: RangoFechaComponent;
    constructor(
        private sedeService: SedeService,
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
        this.sedeService.getAll().subscribe(
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

    openNew() {
        this.sede = {};
        this.sede.editar = false;
        this.submitted = false;
        this.clienteDialog = true;
        this.seleccionado = {};
        this.datosDesdeElPadre.ngOnDestroy();
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(item: any) {
        this.sede = { ...item };
        this.clienteDialog = true;
        this.sede.editar = true;
        this.datosDesdeElPadre.ngOnInit();
    }

    bloqueoCliente(cliente: any) {
        this.deleteProductDialog = true;
        this.sede = { ...cliente };
        this.sede.cambio_estado = true;
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
        this.sedeService
            .cambiarEstado(this.sede)
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
        this.sede = {};
    }

    hideDialog() {
        this.clienteDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;
        this.sede.municipio = 1;
        this.sede.user = localStorage.getItem('user_id');
        if (this.sede.nombre == undefined) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe ingresar una descripción',
                life: 3000,
            });
            return;
        }
        if (this.sede.dane == undefined) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe ingresar un código de DANE',
                life: 3000,
            });
            return;
        }

        if (this.sede.id == undefined) {
            this.crear(this.sede);
        } else {
            this.actualizar(this.sede);
        }
        //this.clientes = [...this.clientes];
        this.clienteDialog = false;
        this.sede = {};
        this.seleccionado = {};
    }

    crear(item: any) {
        this.sedeService
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
        this.sedeService
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

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    }

    createId(): string {
        let id = '';
        const chars =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }
}
