import { Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { finalize } from 'rxjs';
import { CargaService } from 'src/app/core/services/carga.service';
import { ConvivenciaService } from 'src/app/core/services/convivencia.service';
import { LogrosPreescolarService } from 'src/app/core/services/logros-preescolar.service';
import { PreescolarService } from 'src/app/core/services/preescolar.service';
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
    filtro:any;


    nombreModulo: string = 'Registro de Valoración de Desarrollos';
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
    arrayDesarrollos:any=[];
    opcion:any;

    constructor(
        private preescolarService: PreescolarService,
        private cargarService: CargaService,
        private logroService: LogrosPreescolarService,
        private messageService: MessageService,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        this.opcion="guardar";
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
            logros: this.fb.array([], Validators.required),
            matricula_id: ['', Validators.required],
        });
    }

    get logros(): FormArray {
        return this.formEnviar.get('logros') as FormArray;
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
    openModalLogros(index:any, desarrollo:any) {
        this.posicion=index;
        this.mostrarLoading=true;
        setTimeout(() => {
            this.modalLogros = true;
        }, 1000);


        setTimeout(() => {
            let item={
                sede_id:this.form.get("sede_id").value,
                grado_id:this.form.get("grado_id").value,
                asignatura_id:desarrollo,
            }
            this.getLogros(item)
        }, 1000);
        this.mostrarLoading=false;


    }

    getLogros(item:any) {
        this.listadoLogros=[];
        this.logroService
            .getFiltros(item)
            .subscribe(
                (response) => {
                    //console.log(response.data);
                    this.listadoLogros = response.data;
                },
                (error) => {
                    this.messageService.add({
                        severity: 'warn',
                        summary: 'Advertencia',
                        detail: error.error.message,
                        life: 3000,
                    });
                    this.listadoLogros=[];
                }
            );
    }





    getEstudiantes(item: any) {
        this.data=[];
        this.preescolarService
            .getListadoEstudiantes(item)
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


    getCalificacionByMatricula(item: any) {
        this.preescolarService
            .getNotaByMatricula(item)
            .pipe(finalize(() => this.cargarInputsEditar()))
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

    getDesarrollos() {
        let sede= this.form.get('sede_id').value;
        let grado= this.form.get('grado_id').value;
        this.cargarService
            .getAsignaturasBySedeAndGrasdo(sede, grado)
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
                for (let index = 0; index < this.asignaturas.length; index++) {

                    this.logros.push(
                            this.fb.control('', [
                                Validators.required
                            ])
                        );
                }
        }

    }

    cargarInputsEditar() {

        if (this.asignaturas.length > 0) {
            this.clearControls();
                for (let index = 0; index < this.asignaturas.length; index++) {
                    this.logros.push(
                        this.fb.control(this.asignaturas[index].logro, [
                            Validators.required
                        ])
                    );
                }
        }

    }

    crear(item: any) {
        this.preescolarService
            .postData(item)
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
        const arrayLength = this.logros.length;
        for (let i = arrayLength - 1; i >= 0; i--) {
          this.logros.removeAt(i);
        }
      }

      cargarDesarrollos(){
        this.arrayDesarrollos=[];
        for (let index = 0; index < this.asignaturas.length; index++) {
            this.arrayDesarrollos.push(this.asignaturas[index].id);
        }
    }

    onSubmit() {

        if (this.form.valid) {
                this.data=[];
                this.clearControls();
                this.formEnviar.reset();
                this.filtro = this.form.value;
                this.getEstudiantes(this.filtro);
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
        this.getEstudiantes(this.filtro)
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
            this.mostrarLoading=true;
            setTimeout(() => {
                this.cargarDesarrollos();
                let datos = this.formEnviar.value;
                datos.asignaturas=this.arrayDesarrollos;
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


    openModalCalificar(item:any){
        //console.log(item);
        this.nombreEstudiante=item.apellidos+" "+item.nombres;
        let datos={
            matricula_id:item.id,
            periodo_id: this.form.get('periodo_id').value
        };
        this.mostrarLoading=true;
        setTimeout(() => {
            //this.getCalificacionByMatricula(datos)
            //console.log(item.desarrollos==0);
           if(item.desarrollos==0){
            this.getDesarrollos();
           }else{
            this.opcion="editar"
            this.getCalificacionByMatricula(datos);
           }
            this.modalDetalle=true;
            this.formEnviar.get('matricula_id').setValue(item.id);
            this.mostrarLoading=false;
        }, 2000);

    }

    seleccionar(valor:any){
        this.logros.at(this.posicion).setValue(valor);
        this.modalLogros=false;
    }



}
