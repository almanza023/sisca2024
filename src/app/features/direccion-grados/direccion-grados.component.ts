
import { Component, ViewChild } from '@angular/core';
import { finalize } from 'rxjs';

import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectorNivelComponent } from 'src/app/shared/components/selector-nivel/selector-nivel.component';
import { SelectorSedeComponent } from 'src/app/shared/components/selector-sede/selector-sede.component';
import { SelectorTipoComponent } from 'src/app/shared/components/selector-tipo/selector-tipo.component';
import { DireccionGradoService } from 'src/app/core/services/direccion-grados.service';
import { SelectorGradosComponent } from 'src/app/shared/components/selector-grados/selector-grados.component';
import { SelectorDocentesComponent } from 'src/app/shared/components/selector-docentes/selector-docentes.component';



@Component({
    selector: 'app-direccion-grados',
    templateUrl: './direccion-grados.component.html',
    providers: [MessageService],
})
export class DireccionGradosComponent {
    clienteDialog: boolean = false;
    deleteProductDialog: boolean = false;
    deleteProductsDialog: boolean = false;

    data: any[] = [];
    descripcion: string;
    direccion: any = {};
    selectedProducts: any[] = [];
    submitted: boolean = false;
    cols: any[] = [];
    statuses: any[] = [];
    seleccionado: any = {};
    item: any = {};
    rowsPerPageOptions = [5, 10, 20];
    itemsNivel: any = [];
    nombreModulo: string = 'Módulo Dirección de Grados';
    form: FormGroup;
    sedes:any[]=[];
    iid:string='';
    @ViewChild(SelectorGradosComponent) gradoComponent: SelectorGradosComponent;
    @ViewChild(SelectorSedeComponent) sedeComponent: SelectorSedeComponent;
    @ViewChild(SelectorDocentesComponent) docenteComponent: SelectorDocentesComponent;



    constructor(
        private direccionService: DireccionGradoService,
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

        this.statuses = [];
        this.form = this.fb.group({
            sede_id: ['', Validators.required],
            grado_id: ['', Validators.required],
            docente_id: ['', Validators.required],
          });
    }

    reiniciaComponensHijos(): void {
        this.gradoComponent.reiniciarComponente();
        this.sedeComponent.reiniciarComponente();
        this.docenteComponent.reiniciarComponente();
      }


      getValores(event, operacion) {
        switch (operacion) {
            case 'sede':
                if (event != null) {
                    this.form.get('sede_id').setValue(event.id);
                    this.gradoComponent.getGradosBySede(event.id);
                }
                break;
            case 'grado':
                if (event != null) {
                    this.form.get('grado_id').setValue(event.id);
                }
                break;
            case 'docente':
                if (event != null) {
                    this.form.get('docente_id').setValue(event.id);
                }
                break;

        }
    }



    getDataAll() {
        this.direccionService.getAll().subscribe(
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
        this.direccion = {};
        this.direccion.editar = false;
        this.submitted = false;
        this.clienteDialog = true;
        this.seleccionado = {};
        this.reinicarFormulario();

    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(item: any) {
        this.direccion = { ...item };
        this.clienteDialog = true;
        this.direccion.editar = true;
        this.iid=item.id;
        this.submitted = true;
        this.gradoComponent.filtrar(this.direccion.grado_id);
        this.docenteComponent.filtrar(this.direccion.docente_id);
        this.sedeComponent.filtrar(this.direccion.sede_id);
        this.form.patchValue(this.direccion);

    }

    bloqueoCliente(cliente: any) {
        this.deleteProductDialog = true;
        this.direccion = { ...cliente };
        this.direccion.cambio_estado = true;
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
        this.direccionService
            .cambiarEstado(this.direccion)
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
        this.direccion = {};
    }

    hideDialog() {
        this.clienteDialog = false;
        this.submitted = false;
    }


    crear(item: any) {
        this.direccionService
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
        this.direccionService
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
          this.direccion=this.form.value;
          this.direccion.user = localStorage.getItem('user_id');
          if (this.iid=="" || this.iid==undefined) {
              console.log(this.direccion);
              this.crear(this.direccion);
          } else {
            this.direccion.id=this.iid;
              this.actualizar(this.direccion);
          }
          //this.clientes = [...this.clientes];
          this.clienteDialog = false;
          this.direccion = {};
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
