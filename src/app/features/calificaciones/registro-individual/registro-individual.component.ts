import { Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { finalize } from 'rxjs';
import { CalificacionService } from 'src/app/core/services/calificacion.service';
import { CargaService } from 'src/app/core/services/carga.service';
import { LogrosAcademicosService } from 'src/app/core/services/logros-academicos.service';

import { SelectorAsignaturasComponent } from 'src/app/shared/components/selector-asignaturas/selector-asignaturas.component';
import { SelectorGradosComponent } from 'src/app/shared/components/selector-grados/selector-grados.component';
import { SelectorPeriodoComponent } from 'src/app/shared/components/selector-periodo/selector-periodo.component';
import { SelectorSedeComponent } from 'src/app/shared/components/selector-sede/selector-sede.component';

@Component({
    selector: 'app-registro-individual',
    templateUrl: './registro-individual.component.html',
    providers: [MessageService],
})
export class RegistroIndividualComponent {

    operacion:any;
    clienteDialog: boolean = false;
    deleteProductDialog: boolean = false;
    deleteProductsDialog: boolean = false;

    data: any[] = [];

    selectedProducts: any[] = [];

    cols: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    form: FormGroup;
    formEnviar: FormGroup;
    confirmacionModal: boolean = false;
    sede: any;

    nombreModulo: string = 'Calificaciones Individuales';
    @ViewChild(SelectorSedeComponent) sedeComponent: SelectorSedeComponent;
    @ViewChild(SelectorGradosComponent)
    gradosComponent: SelectorGradosComponent;

    @ViewChild(SelectorPeriodoComponent)
    periodoComponent: SelectorPeriodoComponent;

    modalLogros:boolean=false;
    dataLogros:any=[];
    listadoLogros:any=[];
    posicion:any;
    logroCognitivo:any;
    tipologro:any;
    modalDetalle:boolean=false;
    dataNotas:any=[];
    asignaturasListado:any=[];
    calificacionesPeriodo:any=[];
    asignaturas:any=[];
    mostrarLoading:boolean=false;
    nombreEstudiante:any="";


    constructor(
        private calificacionService: CalificacionService,
        private cargarService: CargaService,
        private logroService: LogrosAcademicosService,
        private messageService: MessageService,
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        //this.getDataAll();
        this.cols = [
            { field: 'id', header: 'Código' },
            { field: 'descripcion', header: 'Descripción' },
            { field: 'estado', header: 'Estado' },
        ];


        this.form = this.fb.group({
            sede_id: ['', Validators.required],
            grado_id: ['', Validators.required],
            periodo_id: ['', Validators.required],
        });

        this.formEnviar = this.fb.group({
            sede_id: ['', Validators.required],
            grado_id: ['', Validators.required],
            periodo_id: ['', Validators.required],
            notas: this.fb.array([], Validators.required),
            matricula_id: ['', Validators.required],
        });
    }

    get notas(): FormArray {
        return this.formEnviar.get('notas') as FormArray;
    }

    getValores(event, operacion) {
        switch (operacion) {
            case 'sede':
                if (event != null) {
                    this.form.get('sede_id').setValue(event.id);
                    this.formEnviar.get('sede_id').setValue(event.id);
                    this.gradosComponent.getGradosBySede(event.id);
                    this.sede = event.id;
                }
                break;
            case 'grado':
                if (event != null) {
                    this.form.get('grado_id').setValue(event.id);
                    this.formEnviar.get('grado_id').setValue(event.id);
                }
                break;
            case 'periodo':
                if (event != null) {
                    this.form.get('periodo_id').setValue(event.id);
                    this.formEnviar.get('periodo_id').setValue(event.id);
                }
                break;
        }
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }
    openModalLogros(index:any, tipo:any) {
        if(tipo==1){
            this.posicion=index;
            this.tipologro=tipo;
            this.dataLogros = this.listadoLogros.filter(objeto => objeto.tipo_logro_id == 3);
        }else{
            this.tipologro=tipo;
            this.dataLogros = this.listadoLogros.filter(objeto => objeto.tipo_logro_id == 2);
        }
        this.modalLogros = true;
    }




    getEstudiantes(item: any) {
        this.data=[];
        this.calificacionService
            .getEstudiantes(item)
            .subscribe(
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

    getAsignaturas(item: any) {
        this.data=[];
        this.cargarService
            .getAsignaturasGrado(item)
            .pipe(finalize(() => this.cargarInputs()))
            .subscribe(
                (response) => {
                    //console.log(response.data);
                    this.asignaturas = response.data;
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

    getCalificacionByMatricula(item: any) {
        this.calificacionService
            .getNotaByMatricula(item)
            .pipe(finalize(() => this.cargarInputs()))
            .subscribe(
                (response) => {
                    //console.log(response.data);
                    this.asignaturas = response.data;
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

    cargarInputs() {

        if (this.asignaturas.length > 0) {
            this.clearControls();
            if(this.notas.length==0){
                for (let index = 0; index < this.asignaturas.length; index++) {
                        this.notas.push(
                            this.fb.control(this.asignaturas[index].nota, [
                                Validators.required,
                                Validators.min(1),
                                Validators.max(5),
                            ])
                        );

                }
            }
        }
    }

    crear(item: any) {
        this.calificacionService
            .postDataIndividual(item)
            .pipe(finalize(() => this.reinicarFormulario()))
            .subscribe(
                (response) => {

                    this.dataNotas=response.data;
                    //console.log(response.data);
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

    clearControls() {
        const arrayLength = this.notas.length;
        for (let i = arrayLength - 1; i >= 0; i--) {
          this.notas.removeAt(i);
        }
      }

    onSubmit() {

        if (this.form.valid) {
                this.data=[];
                this.clearControls();
                this.logroCognitivo='';
                this.formEnviar.reset();
                let filtro = this.form.value;
                this.getEstudiantes(filtro);
                //this.getAsignaturas(filtro);
                this.formEnviar.get('sede_id').setValue(this.form.get('sede_id').value);
                this.formEnviar.get('grado_id').setValue(this.form.get('grado_id').value);
                this.formEnviar.get('periodo_id').setValue(this.form.get('periodo_id').value);
        } else {
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Formulario inválido. Verifique los campos.',
                life: 3000,
            });
        }
    }



    reiniciaComponensHijos(): void {
        this.sedeComponent.reiniciarComponente();
        this.gradosComponent.reiniciarComponente();
        this.periodoComponent.reiniciarComponente();
    }

    reinicarFormulario() {
        this.modalDetalle=false;

    }

    cargarAsignaturas(){
        this.asignaturasListado=[];
        for (let index = 0; index < this.asignaturas.length; index++) {
            const element = this.asignaturas[index].id;
            this.asignaturasListado.push(element);

        }
    }

    onSubmitEnviar() {
        //console.log(this.formEnviar.value);
        if (this.formEnviar.valid) {
            this.modalDetalle=false;
            this.mostrarLoading=true;
            setTimeout(() => {
                let datos = this.formEnviar.value;
                this.cargarAsignaturas();
                datos.asignaturas=this.asignaturasListado;
                //console.log(datos);
                this.crear(datos);
                this.mostrarLoading=false;

            }, 2500);
        } else {
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Formulario inválido. Verifique los campos.',
                life: 3000,
            });
        }
    }

    edit(item: any) {}




    repetirNota(opcion:any) {
        switch (opcion) {
            case 1:
                let valor= this.notas.at(0).value;
                if(valor!=""){
                 for (let index = 0; index < this.data.length; index++) {
                     this.notas.at(index).setValue(valor);
                 }
                }
            break;
            case 2:
                 for (let index = 1; index < this.data.length; index++) {
                     this.notas.at(index).setValue('');
                    }

            break;
        }

    }

    openModalCalificar(item:any){
        this.nombreEstudiante=item.apellidos+" "+item.nombres;
        let datos={
            matricula_id:item.id,
            periodo_id: this.form.get('periodo_id').value
        };
        this.mostrarLoading=true;
        setTimeout(() => {
            this.getCalificacionByMatricula(datos);
            this.modalDetalle=true;
            this.formEnviar.get('matricula_id').setValue(item.id);
            this.mostrarLoading=false;
        }, 2000);

    }

}
