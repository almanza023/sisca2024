import { Component, ViewChild } from '@angular/core';
import { finalize } from 'rxjs';

import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { PeriodosService } from 'src/app/core/services/periodos.service';



@Component({
    selector: 'app-periodos',
    templateUrl: './periodos.component.html',
    providers: [MessageService],
})
export class PeriodosComponent {
    clienteDialog: boolean = false;
    deleteProductDialog: boolean = false;
    deleteProductsDialog: boolean = false;
    data: any[] = [];
    periodo: any = {};
    selectedProducts: any[] = [];
    submitted: boolean = false;
    cols: any[] = [];
    statuses: any[] = [];
    seleccionado: any = {};
    item: any = {};
    rowsPerPageOptions = [5, 10, 20];

    nombreModulo: string= "Módulo de Periodos"

    constructor(
        private periodoService: PeriodosService,
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
        this.periodoService
            .getAll()
            .subscribe(
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
        this.periodo = {};
        this.periodo.editar = false;
        this.submitted = false;
        this.clienteDialog = true;
        this.seleccionado = {};

    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(item: any) {
        this.periodo = { ...item };
        this.clienteDialog = true;
        this.periodo.editar = true;

    }

    bloqueoCliente(cliente: any) {
        this.deleteProductDialog = true;
        this.periodo = { ...cliente };
        this.periodo.cambio_estado = true;
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
        this.periodoService
            .cambiarEstado(this.periodo)
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
        this.periodo = {};
    }

    hideDialog() {
        this.clienteDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;
        this.periodo.periodo=1;
        this.periodo.user=localStorage.getItem('user_id');
        if (this.periodo.descripcion == undefined) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe ingresar una Descripción',
                life: 3000,
            });
            return;
        }

        if (this.periodo.numero == undefined) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe ingresar un Código',
                life: 3000,
            });
            return;
        }

        if (this.periodo.porcentaje == undefined) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe ingresar un Porcentaje',
                life: 3000,
            });
            return;
        }

        if (this.periodo.id==undefined) {
            this.crear(this.periodo);
        }else{
            this.actualizar(this.periodo);
        }
         //this.clientes = [...this.clientes];
         this.clienteDialog = false;
         this.periodo = {};
         this.seleccionado = {};
    }

    crear(item: any){
        this.periodoService
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

    actualizar(item: any){
        this.periodoService
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
