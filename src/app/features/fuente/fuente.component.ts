import { Component, ViewChild } from '@angular/core';
import { finalize } from 'rxjs';
import * as FileSaver from 'file-saver';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';


import { Router } from '@angular/router';
import { FuenteService } from '../../core/services/fuente.service';
import { PersonasService } from 'src/app/core/services/personas.service';

@Component({
    selector: 'app-personas',
    templateUrl: './fuente.component.html',
    providers: [MessageService],
})
export class FuentesComponent {
    clienteDialog: boolean = false;
    deleteProductDialog: boolean = false;
    deleteProductsDialog: boolean = false;
    persona: any = {};


    selectedProducts: any[] = [];
    submitted: boolean = false;
    cols: any[] = [];
    errores: any[] = [];
    seleccionado: any = {};

    visibleCampos:boolean=false;
    modalSublideres:boolean=false;
    modalEstadisticas:boolean=false;
    fecha:string="";
    fecha2:string="";
    estadistica:any={};
    nombreModulo: string= "Módulo de Fuente de Datos"
    lider: string= ""
    checked: boolean=false;



    constructor(
        private router: Router,
        private fuenteService: FuenteService,
        private personaService: PersonasService,
        private messageService: MessageService
    ) {}

    ngOnInit() {

    }

    getLider(event){
        this.lider=event.nombrecompleto;
    }


    openNew() {
        this.persona = {};
        this.persona.editar = false;
        this.submitted = false;
        this.clienteDialog = true;
        this.seleccionado = {};
        this.persona.editar = undefined;
        this.visibleCampos = false;

        }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(item: any) {
        console.log(item)
        this.persona = { ...item };
        this.clienteDialog = true;
        this.persona.editar = true;
        this.visibleCampos=true;

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
                detail: 'Debe ingresar un N° de Documento',
                life: 3000,
            });
            return;
        }
        if (this.persona.nombrecompleto == undefined) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe ingresar un Nombre',
                life: 3000,
            });
            return;
        }
        console.log(this.persona);
        if (this.persona.id==undefined) {
            this.crear(this.persona);
        }else{
            this.actualizar(this.persona);
        }
         this.clienteDialog = false;
         this.persona = {};
         this.seleccionado = {};
    }

    crear(item: any){
        this.fuenteService
        .postData(item)
        .subscribe(
            (response) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Exitoso',
                    detail: response.message,
                    life: 3000,
                });
                this.clienteDialog=false;
                this.persona={};
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
        this.fuenteService
        .putData(item)
        .subscribe(
            (response) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Exitoso',
                    detail: response.message,
                    life: 3000,
                });
                this.clienteDialog=false;
                this.persona={};
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
    getEstadisticas(){
        if (this.fecha == undefined) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe ingresar una Fecha Inicial',
                life: 3000,
            });
            return;
        }
        if (this.fecha2 == undefined) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe ingresar una Fecha Final',
                life: 3000,
            });
            return;
        }
        if(this.checked){
            this.lider='Todos';
        }
        this.fuenteService
        .getEstadisticas( this.fecha, this.fecha2, this.lider )
        .subscribe(
            (response) => {
                    this.estadistica=response.data;
                    this.modalEstadisticas=true;
                    console.log(this.estadistica)
            },
            (error) => {
                this.estadistica={};
                this.modalEstadisticas=true;
                this.messageService.add({
                    severity: 'warn',
                    summary: 'Advertencia',
                    detail: "Error al obtener datos.",
                    life: 3000,
                });
            }
        );
    }

    getErrores(){
        this.fuenteService
        .getErrores( this.fecha, this.fecha2, this.lider )
        .pipe(finalize(()=>this.exportExcel()))
            .subscribe(
            (response) => {
                    this.errores=response.data;
            },
            (error) => {
                this.messageService.add({
                    severity: 'warn',
                    summary: 'Advertencia',
                    detail: "Error al obtener datos.",
                    life: 3000,
                });
            }
    );
    }

    exportExcel() {
        if(this.errores.length>0){
            import('xlsx').then((xlsx) => {
                const worksheet = xlsx.utils.json_to_sheet(this.errores);
                const workbook = {
                    Sheets: { data: worksheet },
                    SheetNames: ['data']
                };
                const excelBuffer: any = xlsx.write(workbook, {
                    bookType: 'xlsx',
                    type: 'array',
                });
                this.saveAsExcelFile(excelBuffer, 'Listado Errores');
            });
        }
    }

    saveAsExcelFile(buffer: any, fileName: string): void {
        let EXCEL_TYPE =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE,
        });
        FileSaver.saveAs(
            data,
            fileName + '_export_errores_' + new Date().getTime() + EXCEL_EXTENSION
        );
    }

    validar(){
        if (this.persona.numerodocumento == undefined) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe ingresar un N° de Documento',
                life: 3000,
            });
            return;
        }
        this.personaService
                .validarDocumentoFuente(this.persona.numerodocumento )
                .subscribe(
                    (response) => {
                        if(response.code==400){
                            this.messageService.add({
                                severity: 'warn',
                                summary: 'Advertencia',
                                detail: response.message,
                                life: 3000,
                            });
                            this.visibleCampos=false;
                            return;
                        }else{
                            this.persona.nombrecompleto=response.data.nombrecompleto;
                            this.persona.id=response.data.id;
                            this.visibleCampos=true;
                        }
                    },
                    (error) => {
                        console.log(error)
                        this.messageService.add({
                            severity: 'warn',
                            summary: 'Advertencia',
                            detail: error.error.message,
                            life: 3000,
                        });
                        this.visibleCampos=true;
                    }
                );

    }

    deleteItem(){
        this.deleteProductDialog=true;
    }

    confirmDelete(){
        this.fuenteService
        .deleteData( this.persona.id )
            .subscribe(
            (response) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Advertencia',
                    detail: "Registro Eliminado Exitosamente",
                    life: 3000,
                });
                   this.persona={};
                   this.deleteProductDialog=false;
                   this.clienteDialog=false;
            },
            (error) => {
                this.messageService.add({
                    severity: 'warn',
                    summary: 'Advertencia',
                    detail: "Error al obtener datos.",
                    life: 3000,
                });
                this.deleteProductDialog=false;

            }
    );
    }




}
