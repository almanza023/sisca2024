import { Component, ViewChild } from '@angular/core';
import { finalize } from 'rxjs';

import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { TipoLogroService } from 'src/app/core/services/tipo-logro.service';



@Component({
    selector: 'app-tipo-logros',
    templateUrl: './tipo-logros.component.html',
    providers: [MessageService],
})
export class TipoLogrosComponent {
    clienteDialog: boolean = false;
    deleteProductDialog: boolean = false;
    deleteProductsDialog: boolean = false;

    data: any[] = [];


    tipologro: any = {};
    selectedProducts: any[] = [];
    submitted: boolean = false;
    cols: any[] = [];
    statuses: any[] = [];
    seleccionado: any = {};
    item: any = {};
    rowsPerPageOptions = [5, 10, 20];

    nombreModulo: string= "Módulo de Tipo Logros"

    constructor(
        private tipoLogroService: TipoLogroService,
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
        this.tipoLogroService
            .getAll()
            .subscribe(
                (response) => {
                    console.log(response.data);
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
        this.tipologro = {};
        this.tipologro.editar = false;
        this.submitted = false;
        this.clienteDialog = true;
        this.seleccionado = {};

    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(item: any) {
        this.tipologro = { ...item };
        this.clienteDialog = true;
        this.tipologro.editar = true;

    }

    bloqueoCliente(cliente: any) {
        this.deleteProductDialog = true;
        this.tipologro = { ...cliente };
        this.tipologro.cambio_estado = true;
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
        this.tipoLogroService
            .cambiarEstado(this.tipologro)
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
        this.tipologro = {};
    }

    hideDialog() {
        this.clienteDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;
        this.tipologro.user=localStorage.getItem('user_id');
        if (this.tipologro.nombre == undefined) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe ingresar una descripción',
                life: 3000,
            });
            return;
        }
        if (this.tipologro.id==undefined) {
            this.crear(this.tipologro);
        }else{
            this.actualizar(this.tipologro);
        }
         //this.clientes = [...this.clientes];
         this.clienteDialog = false;
         this.tipologro = {};
         this.seleccionado = {};
    }

    crear(item: any){
        this.tipoLogroService
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
        this.tipoLogroService
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
