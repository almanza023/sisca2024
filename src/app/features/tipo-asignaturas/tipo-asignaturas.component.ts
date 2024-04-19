import { Component, ViewChild } from '@angular/core';
import { finalize } from 'rxjs';

import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { TipoAsignaturaService } from 'src/app/core/services/tipo-asignatura.service';



@Component({
    selector: 'app-tipo-asignaturas',
    templateUrl: './tipo-asignaturas.component.html',
    providers: [MessageService],
})
export class TipoAsignaturasComponent {
    clienteDialog: boolean = false;
    deleteProductDialog: boolean = false;
    deleteProductsDialog: boolean = false;
    data: any[] = [];
    tipo: any = {};
    selectedProducts: any[] = [];
    submitted: boolean = false;
    cols: any[] = [];
    statuses: any[] = [];
    seleccionado: any = {};
    item: any = {};
    rowsPerPageOptions = [5, 10, 20];

    nombreModulo: string= "Módulo de Tipo de Asignaturas"

    constructor(
        private tipoService: TipoAsignaturaService,
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
        this.tipoService
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
        this.tipo = {};
        this.tipo.editar = false;
        this.submitted = false;
        this.clienteDialog = true;
        this.seleccionado = {};

    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(item: any) {
        this.tipo = { ...item };
        this.clienteDialog = true;
        this.tipo.editar = true;

    }

    bloqueoCliente(cliente: any) {
        this.deleteProductDialog = true;
        this.tipo = { ...cliente };
        this.tipo.cambio_estado = true;
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
        this.tipoService
            .cambiarEstado(this.tipo)
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
        this.tipo = {};
    }

    hideDialog() {
        this.clienteDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;
        this.tipo.tipo=1;
        this.tipo.user=localStorage.getItem('user_id');
        if (this.tipo.nombre == undefined) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe ingresar un Nombre',
                life: 3000,
            });
            return;
        }
        if (this.tipo.id==undefined) {
            this.crear(this.tipo);
        }else{
            this.actualizar(this.tipo);
        }
         //this.clientes = [...this.clientes];
         this.clienteDialog = false;
         this.tipo = {};
         this.seleccionado = {};
    }

    crear(item: any){
        this.tipoService
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
        this.tipoService
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
