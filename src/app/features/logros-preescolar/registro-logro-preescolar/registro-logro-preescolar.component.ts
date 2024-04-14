import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { finalize } from 'rxjs';

import { LogrosPreescolarService } from 'src/app/core/services/logros-preescolar.service';
import { SelectorAsignaturasComponent } from 'src/app/shared/components/selector-asignaturas/selector-asignaturas.component';
import { SelectorGradosComponent } from 'src/app/shared/components/selector-grados/selector-grados.component';

import { SelectorSedeComponent } from 'src/app/shared/components/selector-sede/selector-sede.component';

@Component({
  selector: 'app-registro-logro-preescolar',
  templateUrl: './registro-logro-preescolar.component.html',
  providers: [MessageService],
})
export class RegistroLogroPreescolarComponent {
    clienteDialog: boolean = false;
    deleteProductDialog: boolean = false;
    deleteProductsDialog: boolean = false;

    data: any[] = [];
    carga: any = {};
    municipio: any = {};
    tipo: any = {};

    selectedProducts: any[] = [];
    submitted: boolean = false;
    cols: any[] = [];
    statuses: any[] = [];
    seleccionado: any = {};
    item: any = {};
    rowsPerPageOptions = [5, 10, 20];
    stateOptions: any[] = [
        { label: 'Si', value: 'SI' },
        { label: 'No', value: 'NO' },
    ];

    form: FormGroup;
    formBuscar: FormGroup;
    iid:any="";
    confirmacionModal:boolean=false;
    sede:any;

    nombreModulo: string = 'Módulo Registro Valoraciones';
    @ViewChild(SelectorSedeComponent) sedeComponent: SelectorSedeComponent;
    @ViewChild(SelectorGradosComponent) gradosComponent: SelectorGradosComponent;
    @ViewChild(SelectorAsignaturasComponent) asignaturasComponent: SelectorAsignaturasComponent;


    constructor(
        private logroService: LogrosPreescolarService,
        private messageService: MessageService,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        //this.getDataAll();
        this.cols = [
            { field: 'id', header: 'Código' },
            { field: 'descripcion', header: 'Descripción' },
            { field: 'estado', header: 'Estado' },
        ];

        this.statuses = [];
        this.form = this.fb.group({
            sede_id: ['', Validators.required],
            grado_id: ['', Validators.required],
            asignatura_id: ['', Validators.required],
            descripcion: ['', Validators.required],
        });

        this.formBuscar = this.fb.group({
            sede_id: ['', Validators.required],
            grado_id: ['', Validators.required],
            asignatura_id: ['', Validators.required],
        });
    }

    getValores(event, operacion) {
        switch (operacion) {
            case 'sede':
                this.form.get('sede_id').setValue(event.id);
                this.formBuscar.get('sede_id').setValue(event.id);
                this.gradosComponent.getGradosBySede(event.id);
                this.sede=event.id;
                break;
            case 'grado':
                this.form.get('grado_id').setValue(event.id);
                this.formBuscar.get('grado_id').setValue(event.id);
                this.asignaturasComponent.getAsignaturasBySedeAndGrado(this.sede,event.id);
                break;
            case 'asignatura':
                this.form.get('asignatura_id').setValue(event.id);
                this.formBuscar.get('asignatura_id').setValue(event.id);
                break;

        }
    }

    getDataAll() {

    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }


    bloqueoCliente(item: any) {
        this.deleteProductDialog = true;
        this.carga = { ...item };
        this.carga.cambio_estado = true;
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.logroService
            .delete(this.carga.id)
            .pipe(finalize(() => this.filtrarDatos(this.form.value)))
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
        this.carga = {};
    }

    hideDialog() {
        this.clienteDialog = false;
        this.submitted = false;
    }

    crear(item: any) {
        this.logroService
            .postData(item)
            .pipe(finalize(() => this.filtrarDatos(item)))
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
                        detail: error.error.message,
                        life: 3000,
                    });
                }
            );
    }

    actualizar(item: any) {
        this.logroService
            .putData(item)
            .pipe(finalize(() => this.filtrarDatos(item)))
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
                        detail: error.error.message,
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
        console.log(this.iid)
        if(this.form.valid){
            let filtro = this.form.value;
            if(this.iid==""){
                this.crear(filtro);
            }else{
                filtro.id=this.iid;
                this.actualizar(filtro);

            }
            this.reinicarFormulario();

        }else{
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Formulario inválido. Verifique los campos.',
                life: 3000,
            });
        }
    }

    filtrarDatos(filtro: any) {
        this.logroService.filtrar(filtro).subscribe(
            (response) => {
                console.log(response.data);
                this.data = response.data;
            },
            (error) => {
                this.messageService.add({
                    severity: 'warn',
                    summary: 'Advertencia',
                    detail: error.error.message,
                    life: 3000,
                });
            }
        );
    }


    reiniciaComponensHijos(): void {
        this.sedeComponent.reiniciarComponente();
        this.gradosComponent.reiniciarComponente();
        this.asignaturasComponent.reiniciarComponente();
    }

    reinicarFormulario() {
        this.iid="";
        this.form.get('descripcion').setValue("");
        //this.reinicarFormulario();
    }

    onSubmitBuscar(){

        if(this.formBuscar.valid){
            let buscar = this.formBuscar.value;
            this.filtrarDatos(buscar);

        }else{
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Formulario inválido. Verifique los campos.',
                life: 3000,
            });
        }
    }

    edit(item:any){
        this.iid=item.id;
        this.form.get('descripcion').setValue(item.descripcion);

    }




}
