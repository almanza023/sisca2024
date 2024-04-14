import { Component, ViewChild, SimpleChanges } from '@angular/core';
import { finalize } from 'rxjs';

import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';


import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectorSedeComponent } from 'src/app/shared/components/selector-sede/selector-sede.component';
import { SelectorGradosComponent } from 'src/app/shared/components/selector-grados/selector-grados.component';
import { SelectorPeriodoComponent } from 'src/app/shared/components/selector-periodo/selector-periodo.component';
import { ConvivenciaService } from 'src/app/core/services/convivencia.service';

@Component({
    selector: 'app-preescolar',
    templateUrl: './preescolar.component.html',
    providers: [MessageService],
})
export class PreescolarComponent {



    data: any[] = [];
    carga: any = {};
    cols: any[] = [];
    item: any = {};
    rowsPerPageOptions = [5, 10, 20];
    form: FormGroup;
    nombreModulo: string = 'Módulo de Preescolar';

    @ViewChild(SelectorSedeComponent) sedeComponent: SelectorSedeComponent;
    @ViewChild(SelectorGradosComponent) gradosComponent: SelectorGradosComponent;
    @ViewChild(SelectorPeriodoComponent) periodoComponent: SelectorPeriodoComponent;


    constructor(
        private convivenciaService: ConvivenciaService,
        private messageService: MessageService,
        private fb: FormBuilder
    ) {}

    ngOnInit() {

        this.cols = [
            { field: 'id', header: 'Código' },
            { field: 'descripcion', header: 'Descripción' },
            { field: 'estado', header: 'Estado' },
        ];


        this.form = this.fb.group({
            sede_id: ['', Validators.required],
            grado_id: ['', Validators.required],
            periodo_id: ['', Validators.required],
            asignatura_id: ['29', Validators.required],
        });

    }

    ngOnChanges(changes: SimpleChanges): void {}

    getValores(event, operacion) {
        switch (operacion) {
            case 'sede':
                if (event != null) {
                    this.form.get('sede_id').setValue(event.id);
                    //this.formEnviar.get('sede_id').setValue(event.id);
                    this.gradosComponent.limpiar();
                    this.gradosComponent.getDireccionesGrados();
                }
                break;
            case 'grado':
                if (event != null) {
                    this.form.get('grado_id').setValue(event.id);
                    //this.formEnviar.get('grado_id').setValue(event.id);
                }
                break;
            case 'periodo':
                if (event != null) {
                    this.form.get('periodo_id').setValue(event.id);
                    //this.formEnviar.get('periodo_id').setValue(event.id);
                }
                break;
        }
    }

    getDataAll(item:any) {
        this.convivenciaService.getCalificacionesPeriodo(item).subscribe(
            (response) => {
                console.log(response.data);
                if(response.code==300){
                    this.messageService.add({
                        severity: 'warn',
                        summary: 'Advertencia',
                        detail: response.message,
                        life: 3000,
                    });
                }
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





    editProduct(item: any) {
        console.log(item);
        this.carga = { ...item };
        this.carga.editar = true;
        this.sedeComponent.filtrar(this.carga.sede_id);
        this.gradosComponent.filtrar(this.carga.grado_id);
        this.periodoComponent.filtrar(this.carga.periodo_id);

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
        this.getDataAll(filtro);
       }else{
        this.messageService.add({
            severity: 'warn',
            summary: 'Advertencia',
            detail: "Debe Seleccionar todos los campos del formulario",
            life: 3000,
        });
       }
    }


    reiniciaComponensHijos(): void {
        this.sedeComponent.reiniciarComponente();
        this.gradosComponent.reiniciarComponente();
        this.periodoComponent.reiniciarComponente();

    }




}
