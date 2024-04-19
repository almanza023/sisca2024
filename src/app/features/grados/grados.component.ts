import { Component, ViewChild } from '@angular/core';
import { finalize } from 'rxjs';

import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';

import { RangoFechaComponent } from 'src/app/shared/components/rango-fecha/rango-fecha.component';
import { GradosService } from 'src/app/core/services/grados.service';


@Component({
    selector: 'app-grados',
    templateUrl: './grados.component.html',
    providers: [MessageService],
})
export class GradosComponent {
    clienteDialog: boolean = false;
    deleteProductDialog: boolean = false;
    deleteProductsDialog: boolean = false;

    data: any[] = [];

    descripcion: string;
    barrio: any = {};
    selectedProducts: any[] = [];
    submitted: boolean = false;
    cols: any[] = [];
    statuses: any[] = [];
    seleccionado: any = {};
    item: any = {};
    rowsPerPageOptions = [5, 10, 20];
    valorFechaInicial: string = '';
    valorFechaFinal: string = '';
    valorAuditoria: boolean = false;
    nombreModulo: string= "Módulo de Grados"
    @ViewChild('datosDesdeElPadre', { static: false })
    datosDesdeElPadre: RangoFechaComponent;
    constructor(
        private gradoService: GradosService,
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
        this.gradoService
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
        this.barrio = {};
        this.barrio.editar = false;
        this.submitted = false;
        this.clienteDialog = true;
        this.seleccionado = {};
        this.datosDesdeElPadre.ngOnDestroy();
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(item: any) {
        this.barrio = { ...item };
        this.clienteDialog = true;
        this.barrio.editar = true;
        this.datosDesdeElPadre.ngOnInit();
    }

    bloqueoCliente(cliente: any) {
        this.deleteProductDialog = true;
        this.barrio = { ...cliente };
        this.barrio.cambio_estado = true;
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
        this.gradoService
            .cambiarEstado(this.barrio)
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
        this.barrio = {};
    }
    hideDialog() {
        this.clienteDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;
        if (this.barrio.descripcion == undefined) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe ingresar una descripción',
                life: 3000,
            });
            return;
        }
        if (this.barrio.id==undefined) {
            this.crear(this.barrio);
        }else{
            this.actualizar(this.barrio);
        }
         //this.clientes = [...this.clientes];
         this.clienteDialog = false;
         this.barrio = {};
         this.seleccionado = {};
    }

    crear(item: any){
        this.gradoService
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
        this.gradoService
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

    cambiarEstado(item: any){
        this.gradoService
                .cambiarEstado(item)
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

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }


    abrirDialogAuditoria(item: any) {
        this.item = item;
        this.valorAuditoria = true;
    }


}
