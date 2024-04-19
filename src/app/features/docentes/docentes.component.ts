import { DocentesService } from './../../core/services/docentes.service';
import { Component, ViewChild } from '@angular/core';
import { finalize } from 'rxjs';

import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectorNivelComponent } from 'src/app/shared/components/selector-nivel/selector-nivel.component';
import { SelectorSedeComponent } from 'src/app/shared/components/selector-sede/selector-sede.component';
import { SelectorTipoComponent } from 'src/app/shared/components/selector-tipo/selector-tipo.component';



@Component({
    selector: 'app-docentes',
    templateUrl: './docentes.component.html',
    providers: [MessageService],
})
export class DocentesComponent {
    clienteDialog: boolean = false;
    deleteProductDialog: boolean = false;
    deleteProductsDialog: boolean = false;

    data: any[] = [];
    descripcion: string;
    docente: any = {};
    selectedProducts: any[] = [];
    submitted: boolean = false;
    cols: any[] = [];
    statuses: any[] = [];
    seleccionado: any = {};
    item: any = {};
    rowsPerPageOptions = [5, 10, 20];
    itemsNivel: any = [];
    nombreModulo: string = 'Módulo de Docentes';
    form: FormGroup;
    sedes:any[]=[];
    iid:string='';
    @ViewChild(SelectorNivelComponent) nivelComponent: SelectorNivelComponent;
    @ViewChild(SelectorSedeComponent) sedeComponent: SelectorSedeComponent;
    @ViewChild(SelectorTipoComponent) tipoComponent: SelectorTipoComponent;



    constructor(
        private docenteService: DocentesService,
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
            nombres: ['', Validators.required],
            apellidos: ['', Validators.required],
            documento: ['', Validators.required],
            sede_id: ['', Validators.required],
            correo: ['', Validators.required],
            telefono: ['', Validators.required],
            escalafon: ['', Validators.required],
            especialidad: ['', Validators.required],
            nivel: ['', Validators.required],
            tipo: ['', Validators.required],
          });
    }

    reiniciaComponensHijos(): void {
        this.nivelComponent.reiniciarComponente();
        this.sedeComponent.reiniciarComponente();
        this.tipoComponent.reiniciarComponente();
      }

    getNivel(event){
        this.form.get('nivel').setValue(event.descripcion);
    }

    getSede(event){
        this.form.get('sede_id').setValue(event.id);
    }

    getTipo(event){
        this.form.get('tipo').setValue(event.id);
    }

    getDataAll() {
        this.docenteService.getAll().subscribe(
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
        this.docente = {};
        this.docente.editar = false;
        this.submitted = false;
        this.clienteDialog = true;
        this.seleccionado = {};
        this.reinicarFormulario();

    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(item: any) {
        this.docente = { ...item };
        this.clienteDialog = true;
        this.docente.editar = true;
        this.iid=item.id;
        this.submitted = true;
        this.nivelComponent.filtrar(this.docente.nivel);
        this.tipoComponent.filtrar(this.docente.tipo);
        this.sedeComponent.filtrar(this.docente.sede_id);
        this.form.patchValue(this.docente);

    }

    bloqueoCliente(cliente: any) {
        this.deleteProductDialog = true;
        this.docente = { ...cliente };
        this.docente.cambio_estado = true;
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
        this.docenteService
            .cambiarEstado(this.docente)
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
        this.docente = {};
    }

    hideDialog() {
        this.clienteDialog = false;
        this.submitted = false;
    }


    crear(item: any) {
        this.docenteService
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
        this.docenteService
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

    onSubmit() {
        if (this.form.valid) {
          this.docente=this.form.value;
          this.docente.user = localStorage.getItem('user_id');
          if (this.iid=="" || this.iid==undefined) {
            //console.log(this.docente);
              this.crear(this.docente);
          } else {
            this.docente.id=this.iid;
              this.actualizar(this.docente);
          }
          //this.clientes = [...this.clientes];
          this.clienteDialog = false;
          this.docente = {};
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
        this.form.get('nivel').setValue('');
        this.form.get('tipo').setValue('');
        this.form.get('sede_id').setValue('');
        this.reiniciaComponensHijos();
    }
}
