import { Component, ViewChild } from '@angular/core';
import { finalize } from 'rxjs';

import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { UsuarioService } from '../../core/services/usuario.service';




@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html',
    providers: [MessageService],
})
export class UsuariosComponent {
    clienteDialog: boolean = false;
    deleteProductDialog: boolean = false;
    deleteProductsDialog: boolean = false;

    data: any[] = [];
    persona: any = {};
    barrio:any={};
    tipo:any={};

    selectedProducts: any[] = [];
    submitted: boolean = false;
    cols: any[] = [];
    statuses: any[] = [];
    seleccionado: any = {};
    item: any = {};
    rowsPerPageOptions = [5, 10, 20];


    nombreModulo: string= "Módulo de Usuarios"



    constructor(
        private usuarioService: UsuarioService,
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
        this.usuarioService
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
        this.persona = {};
        this.persona.editar = false;
        this.submitted = false;
        this.clienteDialog = true;
        this.seleccionado = {};

        }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(item: any) {
        console.log(item)
        this.persona.id=item.id;
        this.persona.documento=item.documento;
        this.persona.name=item.name;
        this.clienteDialog = true;
        this.persona.editar = true;

    }

    bloqueoCliente(cliente: any) {
        this.deleteProductDialog = true;
        this.persona = { ...cliente };
        this.persona.cambio_estado = true;
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
        this.usuarioService
            .cambiarEstado(this.persona)
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
        this.persona = {};
    }

    hideDialog() {
        this.clienteDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;

        this.persona.user=localStorage.getItem('user_id');
        if (this.persona.numerodocumento == undefined) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe ingresar un N° Documento',
                life: 3000,
            });
            return;
        }
        if (this.persona.nombre == undefined) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe ingresar un Nombre',
                life: 3000,
            });
            return;
        }
        if (this.persona.usuario == undefined) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe ingresar un Usuario',
                life: 3000,
            });
            return;
        }
        if (this.persona.password == undefined) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe ingresar una Clave',
                life: 3000,
            });
            return;
        }

        if (this.persona.rol == undefined) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe seleccionar un Rol',
                life: 3000,
            });
            return;
        }

        if (this.persona.rol == '3' && this.persona.puestoconfirma== undefined) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe seleccionar un Puesto de Confirmación',
                life: 3000,
            });
            return;
        }

        if (this.persona.campanna == undefined) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe seleccionar una Campaña',
                life: 3000,
            });
            return;
        }


        if (this.persona.id==undefined) {
            this.crear(this.persona);
        }else{
            this.actualizar(this.persona);
        }
         //this.clientes = [...this.clientes];
         this.clienteDialog = false;
         this.persona = {};
         this.seleccionado = {};
    }

    crear(item: any){
        this.usuarioService
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
        this.usuarioService
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
