import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { finalize } from 'rxjs';
import { CargaService } from 'src/app/core/services/carga.service';
import { SelectorAsignaturasComponent } from 'src/app/shared/components/selector-asignaturas/selector-asignaturas.component';
import { SelectorDocentesComponent } from 'src/app/shared/components/selector-docentes/selector-docentes.component';
import { SelectorGradosComponent } from 'src/app/shared/components/selector-grados/selector-grados.component';
import { SelectorSedeComponent } from 'src/app/shared/components/selector-sede/selector-sede.component';

@Component({
  selector: 'app-registro-carga',
  templateUrl: './registro-carga.component.html',
  providers: [MessageService],
})
export class RegistroCargaComponent {
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
    api: string = 'NO';
    form: FormGroup;
    iid:any;
    confirmacionModal:boolean=false;

    nombreModulo: string = 'Módulo Registro Carga Académica';
    @ViewChild(SelectorSedeComponent) sedeComponent: SelectorSedeComponent;
    @ViewChild(SelectorGradosComponent) gradosComponent: SelectorGradosComponent;
    @ViewChild(SelectorAsignaturasComponent) asignaturasComponent: SelectorAsignaturasComponent;
    @ViewChild(SelectorDocentesComponent) docentesCompenet: SelectorDocentesComponent;

    constructor(
        private cargaService: CargaService,
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
            docente_id: ['', Validators.required],
            asignatura_id: ['', Validators.required],
            ihs: ['', Validators.required],
            porcentaje: ['', Validators.required],
        });
    }

    getValores(event, operacion) {
        switch (operacion) {
            case 'sede':
                if (event != null) {
                    this.form.get('sede_id').setValue(event.id);
                    //this.formEnviar.get('sede_id').setValue(event.id);
                    //this.gradosComponent.getGradosBySede(event.id);
                }
                break;
            case 'grado':
                if (event != null) {
                    this.form.get('grado_id').setValue(event.id);
                    //this.formEnviar.get('grado_id').setValue(event.id);

                }
                break;
            case 'asignatura':
                if (event != null) {
                    this.form.get('asignatura_id').setValue(event.id);
                    //this.formEnviar.get('asignatura_id').setValue(event.id);
                }
                break;
            case 'docente':
                if (event != null) {
                    this.form.get('docente_id').setValue(event.id);
                    //this.formEnviar.get('periodo_id').setValue(event.id);
                }
                break;
        }
    }



    getDataAll() {
        this.cargaService.getAgregados().subscribe(
            (response) => {
                //console.log(response.data);
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

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }


    bloqueoCliente(cliente: any) {
        this.deleteProductDialog = true;
        this.carga = { ...cliente };
        this.carga.cambio_estado = true;
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.cargaService
            .delete(this.carga.id)
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
        this.carga = {};
    }

    hideDialog() {
        this.clienteDialog = false;
        this.submitted = false;
    }

    crear(item: any) {
        this.cargaService
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

        if(this.form.valid){
            let filtro = this.form.value;
            this.crear(filtro);
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
        this.cargaService.filtrar(filtro).subscribe(
            (response) => {
                //console.log(response.data);
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
        this.docentesCompenet.reiniciarComponente();
    }

    reinicarFormulario() {
        this.form.get('ihs').setValue('');
        this.form.get('porcentaje').setValue('');
    }

    confirmEnvio() {
        this.confirmacionModal = false;
        this.cargaService
            .agregar(this.carga)
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
        this.data =[];
        this.reiniciaComponensHijos();
        this.form.reset();
    }
}
