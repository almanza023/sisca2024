
import { Component, ViewChild } from '@angular/core';
import { finalize } from 'rxjs';

import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AperturaPeriodoService } from 'src/app/core/services/apertura-periodo.service';
import { SelectorPeriodoComponent } from 'src/app/shared/components/selector-periodo/selector-periodo.component';



@Component({
    selector: 'app-apertura-periodo',
    templateUrl: './apertura-periodo.component.html',
    providers: [MessageService],
})
export class AperturaPeriodoComponent {
    clienteDialog: boolean = false;
    deleteProductDialog: boolean = false;
    deleteProductsDialog: boolean = false;

    data: any[] = [];
    apertura: any = {};
    selectedProducts: any[] = [];
    submitted: boolean = false;
    cols: any[] = [];
    seleccionado: any = {};
    item: any = {};
    rowsPerPageOptions = [5, 10, 20];
    itemsNivel: any = [];
    nombreModulo: string = 'Módulo Apertura de Periodos';
    form: FormGroup;
    sedes:any[]=[];
    iid:string='';
    @ViewChild(SelectorPeriodoComponent) periodoComponent: SelectorPeriodoComponent;



    constructor(
        private aperturaService: AperturaPeriodoService,
        private messageService: MessageService,
        private fb: FormBuilder
    ) {

    }

    ngOnInit() {
        this.getDataAll();
        this.cols = [
            { field: 'id', header: 'Código' },
            { field: 'descripcion', header: 'Descripción' },
            { field: 'estado', header: 'Estado' },
        ];

        this.form = this.fb.group({
            fecha_apertura: ['', Validators.required],
            fecha_cierre: ['', Validators.required],
            periodo_id: ['', Validators.required],
          });
    }

    reiniciaComponensHijos(): void {
        this.periodoComponent.reiniciarComponente();
      }


      getValores(event, operacion) {
        switch (operacion) {
            case 'periodo':
                if (event != null) {
                    this.form.get('periodo_id').setValue(event.id);
                }
                break;
        }
    }



    getDataAll() {
        this.aperturaService.getAll().subscribe(
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
       this.apertura = {};
       this.apertura.editar = false;
        this.submitted = false;
        this.clienteDialog = true;
        this.seleccionado = {};
        this.reinicarFormulario();

    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(item: any) {
       this.apertura = { ...item };
        this.clienteDialog = true;
       this.apertura.editar = true;
        this.iid=item.id;
        this.submitted = true;
        this.periodoComponent.filtrar(this.apertura.periodo_id);
        this.form.patchValue(this.apertura);

    }

    bloqueoCliente(cliente: any) {
        this.deleteProductDialog = true;
       this.apertura = { ...cliente };
       this.apertura.cambio_estado = true;
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
        this.aperturaService
            .cambiarEstado(this.apertura)
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
       this.apertura = {};
    }

    hideDialog() {
        this.clienteDialog = false;
        this.submitted = false;
    }


    crear(item: any) {
        this.aperturaService
            .postData(item)
            .pipe(finalize(() => this.getDataAll()))
            .subscribe(
                (response) => {
                    if(response.code==200){
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Exitoso',
                            detail: response.message,
                            life: 3000,
                        });
                    }else{
                        this.messageService.add({
                            severity: 'warn',
                            summary: 'Advertencia',
                            detail: response.message,
                            life: 3000,
                        });
                    }
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
        this.aperturaService
            .putData(item)
            .pipe(finalize(() => this.getDataAll()))
            .subscribe(
                (response) => {
                    if(response.code==200){
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Exitoso',
                            detail: response.message,
                            life: 3000,
                        });
                    }else{
                        this.messageService.add({
                            severity: 'warn',
                            summary: 'Advertencia',
                            detail: response.message,
                            life: 3000,
                        });
                    }
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

    onSubmit() {
        console.log(this.form.value);
        if (this.form.valid) {
         this.apertura=this.form.value;
         this.apertura.user = localStorage.getItem('user_id');
          if (this.iid=="" || this.iid==undefined) {
              console.log(this.apertura);
              this.crear(this.apertura);
          } else {
           this.apertura.id=this.iid;
              this.actualizar(this.apertura);
          }
          //this.clientes = [...this.clientes];
          this.clienteDialog = false;
         this.apertura = {};
          this.seleccionado = {};
          this.reinicarFormulario();

        } else {
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: "Formulario inválido. Verifique los campos.",
                life: 3000,
            });

        }
      }
    reinicarFormulario(){
        this.iid="";
        this.form.reset();
        this.reiniciaComponensHijos();
    }
}
